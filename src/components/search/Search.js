// import { useState } from "react";

// function Search() {
//   const fruits = [
//     { id: 1, name: "Apple", color: "Red", symbol: "🍎" },
//     { id: 2, name: "Banana", color: "Yellow", symbol: "🍌" },
//     { id: 3, name: "Orange", color: "Orange", symbol: "🍊" },
//     { id: 4, name: "Grapes", color: "Purple", symbol: "🍇" },
//     { id: 5, name: "Mango", color: "Yellow", symbol: "🥭" },
//     { id: 6, name: "Strawberry", color: "Red", symbol: "🍓" },
//     { id: 7, name: "Watermelon", color: "Green", symbol: "🍉" },
//     { id: 8, name: "Pineapple", color: "Brown", symbol: "🍍" },
//     { id: 9, name: "Papaya", color: "Orange", symbol: "🍈" },
//     { id: 10, name: "Cherry", color: "Red", symbol: "🍒" },
//     { id: 11, name: "Peach", color: "Pink", symbol: "🍑" },
//     { id: 12, name: "Kiwi", color: "Brown", symbol: "🥝" },
//     { id: 13, name: "Blueberry", color: "Blue", symbol: "🫐" },
//     { id: 14, name: "Pomegranate", color: "Red", symbol: "🔴" },
//     { id: 15, name: "Guava", color: "Green", symbol: "🍏" },
//   ];
  
//   // Search
//   const [search, setSearch] = useState("");
// //   const filteredFruits = fruits.filter((fruit) =>
// //     fruit.name.toLowerCase().includes(search.toLowerCase())
// //   );
//   const filteredFruits = fruits.filter((fruit) =>search === ""||
//     fruit.name.toLowerCase().startsWith(search.toLowerCase())
//   );

// // render

//   const fruit = filteredFruits.map((fr, id) => (
//     <tr key={id}>
//       <td>{fr.id}</td>
//       <td>{fr.name}</td>
//       <td>{fr.color}</td>
//       <td>{fr.symbol}</td>
//     </tr>
//   ));

//   // Search Functionality

//   return (
//     <>
//       <input
//         type="search"
//         value={search}
//         placeholder="Search ...."
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
//       ></input>
//       <table border="1">
//         <thead>
//           <tr>
//             <td>S. No.</td>
//             <td>Fruit</td>
//             <td>Color</td>
//             <td>Symbol</td>
//           </tr>
//         </thead>
//         <tbody>{fruit}</tbody>
//       </table>
//     </>
//   );
// }

// export default Search;


import { useState } from "react";

function Search() {
  const fruits = [
    { id: 1, name: "Apple", color: "Red", symbol: "🍎" },
    { id: 2, name: "Banana", color: "Yellow", symbol: "🍌" },
    { id: 3, name: "Orange", color: "Orange", symbol: "🍊" },
    { id: 4, name: "Grapes", color: "Purple", symbol: "🍇" },
    { id: 5, name: "Mango", color: "Yellow", symbol: "🥭" },
    { id: 6, name: "Strawberry", color: "Red", symbol: "🍓" },
    { id: 7, name: "Watermelon", color: "Green", symbol: "🍉" },
    { id: 8, name: "Pineapple", color: "Brown", symbol: "🍍" },
    { id: 9, name: "Papaya", color: "Orange", symbol: "🍈" },
    { id: 10, name: "Cherry", color: "Red", symbol: "🍒" },
    { id: 11, name: "Peach", color: "Pink", symbol: "🍑" },
    { id: 12, name: "Kiwi", color: "Brown", symbol: "🥝" },
    { id: 13, name: "Blueberry", color: "Blue", symbol: "🫐" },
    { id: 14, name: "Pomegranate", color: "Red", symbol: "🔴" },
    { id: 15, name: "Guava", color: "Green", symbol: "🍏" },
  ];

  // Search Inputs
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("startsWith");
  const [colorFilter, setColorFilter] = useState("");

  // Search Logic
  const filteredFruits = fruits.filter((fruit) => {
    const searchTerm = search.toLowerCase();
    const name = fruit.name.toLowerCase();

    let matchesSearch = false;
    if (searchTerm === "") {
      matchesSearch = true;
    } else if (searchType === "startsWith") {
      matchesSearch = name.startsWith(searchTerm);
    } else if (searchType === "includes") {
      matchesSearch = name.includes(searchTerm);
    } else if (searchType === "exact") {
      matchesSearch = name === searchTerm;
    } else if (searchType === "endsWith") {
      matchesSearch = name.endsWith(searchTerm);
    } else if (searchType === "symbol") {
      matchesSearch = fruit.symbol.includes(searchTerm);
    }

    // Apply color filter if selected
    const matchesColor = colorFilter === "" || fruit.color === colorFilter;

    return matchesSearch && matchesColor;
  });

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        {/* Search Input */}
        <input
          type="search"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "5px", width: "200px", marginRight: "10px" }}
        />

        {/* Search Type Dropdown */}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        >
          <option value="startsWith">Starts With</option>
          <option value="includes">Contains</option>
          <option value="endsWith">Ends With</option>
          <option value="exact">Exact Match</option>
          <option value="symbol">Search by Symbol</option>
        </select>

        {/* Color Filter Dropdown */}
        <select
          value={colorFilter}
          onChange={(e) => setColorFilter(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="">All Colors</option>
          {[...new Set(fruits.map((fruit) => fruit.color))].map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Table Display */}
      <table border="1">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Fruit</th>
            <th>Color</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {filteredFruits.map((fruit) => (
            <tr key={fruit.id}>
              <td>{fruit.id}</td>
              <td>{fruit.name}</td>
              <td>{fruit.color}</td>
              <td>{fruit.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
