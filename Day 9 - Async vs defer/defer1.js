console.log('Defer Script 1 Loaded');
document.getElementById('defer-result').innerHTML += '<div class="message">Defer Script 1 Loaded</div>';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Defer Script 1 Executed');
  document.getElementById('defer-result').innerHTML += '<div class="message">Defer Script 1 Executed</div>';
  performance.mark('defer1-execution');
  performance.measure('defer1-download', 'defer1-start-download', 'defer1-execution');
  // const measure3 = performance.getEntriesByName('defer1-download')[0];
  // console.log(`Defer Script 1 Download Time: ${measure3.duration.toFixed(2)}ms`);
  // document.getElementById('defer-result').innerHTML += `<div class="message">Defer Script 1 Download Time: ${measure3.duration.toFixed(2)}ms</div>`;
});
