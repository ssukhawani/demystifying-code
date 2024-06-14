console.log('Defer Script 2 Loaded');
document.getElementById('defer-result').innerHTML += '<div class="message">Defer Script 2 Loaded</div>';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Defer Script 2 Executed');
  document.getElementById('defer-result').innerHTML += '<div class="message">Defer Script 2 Executed</div>';
  performance.mark('defer2-execution');
  performance.measure('defer2-download', 'defer2-start-download', 'defer2-execution');
  // const measure4 = performance.getEntriesByName('defer2-download')[0];
  // console.log(`Defer Script 2 Download Time: ${measure4.duration.toFixed(2)}ms`);
  // document.getElementById('defer-result').innerHTML += `<div class="message">Defer Script 2 Download Time: ${measure4.duration.toFixed(2)}ms</div>`;
});
