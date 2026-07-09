import os
import re

# Pattern A: big SVG-style "Follow us" block, the X/Twitter anchor specifically
# (identified by borderColor='#fff' hover, unique to the X icon in this set)
SVG_X_BLOCK = re.compile(
    r'\s*<a href="#" target="_blank" rel="noopener".*?</a>',
    re.DOTALL
)

def remove_svg_x(content):
    def check(m):
        block = m.group(0)
        if "borderColor='#fff'" in block and 'X' in block:
            return ''
        return block
    return SVG_X_BLOCK.sub(check, content)

# Pattern B: aria-label style icon
ARIA_X = '<a href="#" aria-label="X (Twitter)">X</a>'

# Pattern C: contact page's plain text row ending in X
PLAIN_X = '<a href="#">X</a>'

def fix_content(content):
    content = remove_svg_x(content)
    content = content.replace(ARIA_X, '')
    content = content.replace(PLAIN_X, '')
    return content

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
    content = fix_content(content)
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Updated: {filepath}")
    else:
        print(f"⏭️  No changes: {filepath}")
print("\nDone!")
