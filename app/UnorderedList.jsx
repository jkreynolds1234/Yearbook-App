const React = require('react');

/* takes an array prop 'items' and returns a <ul> element 
   with each item as <li> elements */
const UnorderedList = function({ items }) {
  return (
    <ul>
      {items.map(function(item, i) {
        return <li key={i}>{item}</li>;
      })}
    </ul>
  );
}


// This line indicates what functions or data from this file will be included in 
// other Javascript files when this file is required
module.exports = UnorderedList;
