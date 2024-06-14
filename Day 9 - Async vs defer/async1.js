console.log('Async Script 1 Loaded');
document.getElementById('async-result').innerHTML += '<div class="message">Async Script 1 Loaded</div>';

setTimeout(() => {
  console.log('Async Script 1 Executed');
  document.getElementById('async-result').innerHTML += '<div class="message">Async Script 1 Executed</div>';
  performance.mark('async1-execution');
  performance.measure('async1-download', 'async1-start-download', 'async1-execution');
  // const measure = performance.getEntriesByName('async1-download')[0];
  // console.log(`Async Script 1 Download Time: ${measure.duration.toFixed(2)}ms`);
  // document.getElementById('async-result').innerHTML += `<div class="message">Async Script 1 Download Time: ${measure.duration.toFixed(2)}ms</div>`;
}, 1000); // Simulate slower download
