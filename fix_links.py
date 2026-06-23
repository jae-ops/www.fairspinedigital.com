import os
import re

# Map of old .html paths to new clean paths
REPLACEMENTS = {
    'https://www.fairspinedigital.com/index.html': 'https://www.fairspinedigital.com/',
    'https://www.fairspinedigital.com/about.html': 'https://www.fairspinedigital.com/about',
    'https://www.fairspinedigital.com/services.html': 'https://www.fairspinedigital.com/services',
    'https://www.fairspinedigital.com/pricing.html': 'https://www.fairspinedigital.com/pricing',
    'https://www.fairspinedigital.com/insights.html': 'https://www.fairspinedigital.com/insights',
    'https://www.fairspinedigital.com/careers.html': 'https://www.fairspinedigital.com/careers',
    'https://www.fairspinedigital.com/contact.html': 'https://www.fairspinedigital.com/contact',
    'https://www.fairspinedigital.com/pilot.html': 'https://www.fairspinedigital.com/pilot',
    # Relative paths
    '"index.html"': '"/"',
    '"about.html"': '"/about"',
    '"services.html"': '"/services"',
    '"pricing.html"': '"/pricing"',
    '"insights.html"': '"/insights"',
    '"careers.html"': '"/careers"',
    '"contact.html"': '"/contact"',
    '"pilot.html"': '"/pilot"',
    # With ./ prefix
    '"./index.html"': '"/"',
    '"./about.html"': '"/about"',
    '"./services.html"': '"/services"',
    '"./pricing.html"': '"/pricing"',
    '"./insights.html"': '"/insights"',
    '"./careers.html"': '"/careers"',
    '"./contact.html"': '"/contact"',
    '"./pilot.html"': '"/pilot"',
    # Anchor href patterns (single quotes)
    "'index.html'": "'/'",
    "'about.html'": "'/about'",
    "'services.html'": "'/services'",
    "'pricing.html'": "'/pricing'",
    "'insights.html'": "'/insights'",
    "'careers.html'": "'/careers'",
    "'contact.html'": "'/contact'",
    "'pilot.html'": "'/pilot'",
    # services.html anchor links
    '"services.html#social-media-marketing"': '"/services#social-media-marketing"',
    '"services.html#seo"': '"/services#seo"',
    '"services.html#website-design"': '"/services#website-design"',
    '"services.html#graphic-motion-design"': '"/services#graphic-motion-design"',
    '"services.html#ppc-advertising"': '"/services#ppc-advertising"',
    '"services.html#email-marketing"': '"/services#email-marketing"',
    '"services.html#content-marketing"': '"/services#content-marketing"',
    '"services.html#influencer-marketing"': '"/services#influencer-marketing"',
    'https://www.fairspinedigital.com/services.html#social-media-marketing': 'https://www.fairspinedigital.com/services#social-media-marketing',
    'https://www.fairspinedigital.com/services.html#seo': 'https://www.fairspinedigital.com/services#seo',
    'https://www.fairspinedigital.com/services.html#website-design': 'https://www.fairspinedigital.com/services#website-design',
    'https://www.fairspinedigital.com/services.html#graphic-motion-design': 'https://www.fairspinedigital.com/services#graphic-motion-design',
    'https://www.fairspinedigital.com/services.html#ppc-advertising': 'https://www.fairspinedigital.com/services#ppc-advertising',
    'https://www.fairspinedigital.com/services.html#email-marketing': 'https://www.fairspinedigital.com/services#email-marketing',
    'https://www.fairspinedigital.com/services.html#content-marketing': 'https://www.fairspinedigital.com/services#content-marketing',
    'https://www.fairspinedigital.com/services.html#influencer-marketing': 'https://www.fairspinedigital.com/services#influencer-marketing',
}

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
print(f"Found {len(html_files)} HTML files: {html_files}\n")

for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for old, new in REPLACEMENTS.items():
        content = content.replace(old, new)

    if content != original:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Updated: {filename}")
    else:
        print(f"⏭️  No changes: {filename}")

print("\nDone! All HTML files updated.")
