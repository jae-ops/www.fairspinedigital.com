import os

# All replacements needed
REPLACEMENTS = {
    'href="style.css"': 'href="/style.css"',
    'href="./style.css"': 'href="/style.css"',
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
}

# Walk ALL directories recursively
html_files = []
for root, dirs, files in os.walk('.'):
    # Skip hidden folders
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

print(f"Found {len(html_files)} HTML files:\n")

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for old, new in REPLACEMENTS.items():
        content = content.replace(old, new)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Updated: {filepath}")
    else:
        print(f"⏭️  No changes: {filepath}")

print("\nDone!")
