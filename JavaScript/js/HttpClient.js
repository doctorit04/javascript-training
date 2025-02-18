
async function getData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('URL not found');
              } else if (response.status === 500) {
                throw new Error('Server error');
              } else {
                throw new Error(`Network response was not ok: ${response.status}`,);
              }
        }
    
        const json = await response.json();
        return json;

      } catch (error) {
        console.error(error.message);
      }
}


async function getDataV2(url) {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Data not found');
            } else if (response.status === 500) {
                throw new Error('Server error');
            } else {
                throw new Error('Network response was not ok');
            }
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}