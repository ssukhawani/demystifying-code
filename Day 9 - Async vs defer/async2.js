console.log('Async Script 2 Loaded');
document.getElementById('async-result').innerHTML += '<div class="message">Async Script 2 Loaded</div>';

console.log('Async Script 2 Executed');
document.getElementById('async-result').innerHTML += '<div class="message">Async Script 2 Executed</div>';
performance.mark('async2-execution');
performance.measure('async2-download', 'async2-start-download', 'async2-execution');
// const measure2 = performance.getEntriesByName('async2-download')[0];
// console.log(`Async Script 2 Download Time: ${measure2.duration.toFixed(2)}ms`);
// document.getElementById('async-result').innerHTML += `<div class="message">Async Script 2 Download Time: ${measure2.duration.toFixed(2)}ms</div>`;
