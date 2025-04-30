// script.js
import {
    get_items,
    add_item,
    update_item_title_by_id,
    delete_item_by_id,
    get_item_title_by_id
  } from './data.js';
  
  // Test add_item
  console.log(add_item({ id: 1, title: "First Item" }));  // true
  console.log(add_item({ id: 1, title: "Duplicate Item" })); // false
  
  // Test get_items
  console.log("All items:", get_items()); // [{ id: 1, title: "First Item" }]
  
  // Test update_item_title_by_id
  console.log(update_item_title_by_id(1, "Updated Title")); // true
  console.log(update_item_title_by_id(2, "No Match")); // false
  
  // Test get_item_title_by_id
  console.log(get_item_title_by_id(1)); // "Updated Title"
  console.log(get_item_title_by_id(2)); // undefined
  
  // Test delete_item_by_id
  console.log(delete_item_by_id(1)); // true
  console.log(delete_item_by_id(2)); // false
  console.log("After deletion:", get_items()); // []
  