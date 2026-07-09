import os
import re

# --- Exact replacements (kept from the original script) ---
REPLACEMENTS = {
    'href="style.css"': 'href="/style.css"',
    'href="./style.css"': 'href="/style.css"',
    'href="styles.css"': 'href="/style.css"',
    'href="./styles.css"': 'href="/style.css"',
    'src="script.js"': 'src="/script.js"',
    'src="./script.js"': 'src="/script.js"',
    'src="effects.js"': 'src="/effects.js"',
    'src="./effects.js"': 'src="/effects.js"',
    'href="favicon.svg"': 'href="/favicon.svg"',
    'href="./favicon.svg"': 'href="/favicon.svg"',
    'href="index.html"': 'href="/"',
    'href="./index.html"': 'href="/"',
    'href="about.html"': 'href="/about"',
    'href="./about.html"': 'href="/about"',
    'href="services.html"': 'href="/services"',
    'href="./services.html"': 'href="/services"',
    'href="insights.html"': 'href="/insights"',
    'href="./insights.html"': 'href="/insights"',
    'href="contact.html"': 'href="/contact"',
    'href="./contact.html"': 'href="/contact"',
    'href="careers.html"': 'href="/careers"',
    'href="./careers.html"': 'href="/careers"',
    'href="pilot.html"': 'href="/pilot"',
    'href="./pilot.html"': 'href="/pilot"',
    'href="regions.html"': 'href="/regions"',
    'href="./regions.html"': 'href="/regions"',
    'href="broadcast.html"': 'href="/broadcast"',
    'href="./broadcast.html"': 'href="/broadcast"',
    'href="pricing.html"': 'href="/pricing"',
    'href="./pricing.html"': 'href="/pricing"',
}

# --- Regex fix for anchor-fragment links, e.g. href="services.html#seo" ---
FRAGMENT_PATTERN = re.compile(r'href="(?!/)([a-zA-Z_-]+)\.html(#[^"]*)"')

# --- Regex fix for the JS search-index arrays, e.g. url:'services.html' ---
SEARCH_INDEX_PATTERN = re.compile(r"url:'([a-zA-Z_-]+)\.html'")

# --- Full-domain links pointing at pages with a wrong .html suffix ---
FULL_DOMAIN_REPLACEMENTS = {
    'https://www.fairspinedigital.com/google-business-profile.html': '/google-business-profile',
    'https://www.fairspinedigital.com/social-tune-up.html': '/social-tune-up',
    # No dedicated page exists yet for this article - point at the Insights hub for now
    'https://www.fairspinedigital.com/website-brief.html': '/insights',
}

def fix_content(content):
    for old, new in REPLACEMENTS.items():
        content = content.replace(old, new)

    for old, new in FULL_DOMAIN_REPLACEMENTS.items():
        content = content.replace(old, new)

    content = FRAGMENT_PATTERN.sub(lambda m: f'href="/{m.group(1)}{m.group(2)}"', content)

    def search_index_fix(m):
        page = m.group(1)
        return "url:'/'" if page == 'index' else f"url:'/{page}'"
    content = SEARCH_INDEX_PATTERN.sub(search_index_fix, content)

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
