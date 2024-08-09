// Utility file to handle all buttons clicks

/****************************
 ******* Home Page **********
****************************/
export async function fetchLetterboxedLetters() {
    try {
        const response = await fetch('https://backend-server-roan.vercel.app/fetchLetterBoxedSides');
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        return json;
    } catch(error) {
        console.error('Error fetching the data: ', error);
        throw error;
    }
}