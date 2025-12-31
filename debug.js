// DEBUG INFO - Open browser console (F12) to see this

console.log('=== DEBUG INFO ===');
console.log('1. Checking momentsData keys:');
console.log('Available seasons:', Object.keys(momentsData));

console.log('\n2. Checking timeline items:');
document.querySelectorAll('.timeline-item[data-moment]').forEach(item => {
    console.log('- Found item with data-moment:', item.dataset.moment);
});

console.log('\n3. Testing modal data:');
console.log('Xuan data:', momentsData.xuan ? '✓ OK' : '✗ MISSING');
console.log('Ha data:', momentsData.ha ? '✓ OK' : '✗ MISSING');
console.log('Thu data:', momentsData.thu ? '✓ OK' : '✗ MISSING');
console.log('Dong data:', momentsData.dong ? '✓ OK' : '✗ MISSING');

console.log('\n4. Testing image paths:');
if (momentsData.ha) {
    const haImages = getSeasonImages('ha', 10);
    console.log('Mùa Hạ images:', haImages);
}

console.log('\n=== END DEBUG ===');
