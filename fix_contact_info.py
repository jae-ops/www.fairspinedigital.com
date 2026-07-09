import os
import re

FACEBOOK = "https://www.facebook.com/FairspineDigital"
INSTAGRAM = "https://www.instagram.com/fairspinedigital?igsh=MXdlenZlOGRlN2d0OA=="
LINKEDIN = "https://www.linkedin.com/company/fairspine-digital/"
OLD_EMAIL = "fairspinedigital@gmail.com"
NEW_EMAIL = "hello@fairspinedigital.com"

# Pattern A: the big "Follow us" block with SVG icons, 4 identical `href="#" target="_blank" rel="noopener" ...`
# anchors in a row (Facebook, Instagram, LinkedIn, X). We match each whole <a ...>...</a> block
# non-greedily and look at the visible label right before the closing tag to know which platform it is.
ANCHOR_BLOCK = re.compile(r'<a href="#"( target="_blank" rel="noopener".*?)</a>', re.DOTALL)

def fix_follow_us_block(match):
    inner = match.group(1)
    if 'Facebook' in inner:
        return f'<a href="{FACEBOOK}"{inner}</a>'
    if 'Instagram' in inner:
        return f'<a href="{INSTAGRAM}"{inner}</a>'
    if 'LinkedIn' in inner:
        return f'<a href="{LINKEDIN}"{inner}</a>'
    # X / Twitter (not requested) - leave as-is
    return match.group(0)

# Pattern B: simple aria-label icons, e.g. <a href="#" aria-label="Facebook">FB</a>
ARIA_REPLACEMENTS = {
    'href="#" aria-label="Facebook"': f'href="{FACEBOOK}" target="_blank" rel="noopener" aria-label="Facebook"',
    'href="#" aria-label="Instagram"': f'href="{INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram"',
    'href="#" aria-label="LinkedIn"': f'href="{LINKEDIN}" target="_blank" rel="noopener" aria-label="LinkedIn"',
}

# Pattern C: contact page's plain "FB / IG / LI / X" text links, all identical href="#" with no aria-label,
# in a fixed order Facebook, Instagram, LinkedIn, X.
SOCIAL_LINKS_LINE = re.compile(
    r'<a href="#">FB</a><a href="#">IG</a><a href="#">LI</a><a href="#">X</a>'
)

def fix_content(content):
    content = content.replace(OLD_EMAIL, NEW_EMAIL)
    content = ANCHOR_BLOCK.sub(fix_follow_us_block, content)
    for old, new in ARIA_REPLACEMENTS.items():
        content = content.replace(old, new)
    content = SOCIAL_LINKS_LINE.sub(
        f'<a href="{FACEBOOK}" target="_blank" rel="noopener">FB</a>'
        f'<a href="{INSTAGRAM}" target="_blank" rel="noopener">IG</a>'
        f'<a href="{LINKEDIN}" target="_blank" rel="noopener">LI</a>'
        f'<a href="#">X</a>',
        content,
    )
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
