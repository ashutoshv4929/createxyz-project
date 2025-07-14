module.exports = {
  globDirectory: '.',
  globPatterns: [
    'public/icons/**/*', // हमारे सभी आइकॉन्स
    'public/manifest.json', // हमारा मैनिफेस्ट
    '.next/static/chunks/**/*.js', // Next.js के ज़रूरी जावास्क्रिप्ट हिस्से
    '.next/static/css/**/*.css'   // Next.js की ज़रूरी CSS फाइलें
  ],
  swDest: 'public/sw.js',
  globIgnores: [
    '**/*.map',
    'next.config.js',
    '.next/server/**'
  ],
};
