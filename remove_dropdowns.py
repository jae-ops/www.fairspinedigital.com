import os
import re

# Matches a full <li class="nav-item"> ... </li> block containing a dropdown,
# and replaces it with a plain <li><a href="...">Label</a></li>
NAV_ITEM_PATTERN = re.compile(
    r'<li class="nav-item">\s*'
    r'<a href="([^"]+)">([^<]+?)\s*<span class="caret"></span></a>\s*'
    r'<div class="dropdown">.*?</div>\s*'
    r'</li>',
    re.DOTALL
)

def remove_dropdowns(content):
    def repl(m):
        href, label = m.group(1), m.group(2)
        return f'<li><a href="{href}">{label}</a></li>'
    return NAV_ITEM_PATTERN.sub(repl, content)

html_files = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

print(f"Found {len(html_files)} HTML files:\n")
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    content = remove_dropdowns(content)
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Updated: {filepath}")
    else:
        print(f"⏭️  No changes: {filepath}")
print("\nDone!")
