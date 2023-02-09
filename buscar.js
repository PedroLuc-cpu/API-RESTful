async function fetchData() {
       try {
         const response = await fetch('http://127.0.0.1:3000/person');
         const json = await response.json();
         console.log(json);
       } catch (error) {
         console.error('Fetch failed:', error);
       }
     }
     
     fetchData();
     