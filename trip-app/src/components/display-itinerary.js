// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const DisplayItinerary = () => {
//     const location = useLocation();
//     const [dayWiseItinerary, setDayWiseItinerary] = useState({});

//     // Parse the itinerary data received from the previous page
//     useEffect(() => {
//         const { itinerary } = location.state || {}; // Get itinerary from passed state
//         if (itinerary) {
//             const parsedItinerary = parseItineraryResponse(itinerary);
//             setDayWiseItinerary(parsedItinerary);
//             const extractedText = itinerary.candidates[0].content.parts[0].text;
//             console.log(extractedText);
//         }
//     }, [location.state]);

//     // Function to parse the itinerary and organize activities day-wise
//     const parseItineraryResponse = (itinerary) => {
//         return itinerary;
//         // const dayWiseItinerary = {};
//         // itinerary.forEach(activity => {
//         //     const day = activity.day;
//         //     if (!dayWiseItinerary[day]) {
//         //         dayWiseItinerary[day] = [];
//         //     }
//         //     dayWiseItinerary[day].push(activity);
//         // });
//         // return dayWiseItinerary;
//     };

//     // Render the itinerary
//     return (
//         <div>
//             <h1>Your Itinerary</h1>
//             {/* {Object.keys(dayWiseItinerary).map(day => (
//                 <div key={day}>
//                     <h2>Day {day}</h2>
//                     <ul>
//                         {dayWiseItinerary[day].map((activity, index) => (
//                             <li key={index}>
//                                 <strong>Activity:</strong> {activity.activity} <br />
//                                 <strong>Time:</strong> {activity.time} <br />
//                                 <strong>Location:</strong> <a href={activity.mapLink} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))} */}
//         </div>
//     );
// };

// export default DisplayItinerary;

// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const DisplayItinerary = () => {
//     const [itinerary, setItinerary] = useState({});
//     const location = useLocation();


//     useEffect(() => {
//         const { itineraryText } = location.state || {};
//         if(itineraryText) {
//             const extractedText = itineraryText.candidates[0].content.parts[0].text;
//             console.log(extractedText);
//             const parsedItinerary = parseItinerary(extractedText);
//             setItinerary(parsedItinerary);
//         }
//         else {
//             console.log("empty hai itinerary");
//         }
//     }, [location.state]);

//     // Function to parse the itinerary string
//     const parseItinerary = (extractedText) => {
//         // Check if extractedText is defined and is a string
//         if (typeof extractedText === 'string') {
//             const dayWiseItinerary = {};
    
//             // Assuming each day starts with "Day X:" and each section is split by "**"
//             const days = extractedText.split(/\*\*Day \d+:\*\*/).filter(Boolean); // Split by day headers and filter out empty strings
    
//             days.forEach((dayText, index) => {
//                 const [title, ...sections] = dayText.split('**').filter(Boolean); // Split by sections
    
//                 dayWiseItinerary[`${index + 1}`] = {
//                     title: title.trim(),
//                     sections: sections.map(section => section.trim()),
//                 };
//             });
    
//             return dayWiseItinerary;
//         } else {
//             console.error("Invalid text format or undefined text");
//             return {}; // Return an empty object if the text is not in the expected format
//         }
//     };

//     // Function to extract specific activity segments
//     const extractActivity = (segments, timeOfDay) => {
//         const segment = segments.find(seg => seg.includes(timeOfDay));
//         return segment ? segment.split(`${timeOfDay}:**`)[1].trim() : 'No activities planned';
//     };

//     // Render the itinerary
//     return (
//         <div>
//             <h1>Trip Itinerary</h1>
//             {Object.keys(itinerary).map(day => (
//                 <div key={day}>
//                     <h2>Day {day}</h2>
//                     <div><strong>Morning:</strong> <p>{itinerary[day].Morning}</p></div>
//                     <div><strong>Afternoon:</strong> <p>{itinerary[day].Afternoon}</p></div>
//                     <div><strong>Evening:</strong> <p>{itinerary[day].Evening}</p></div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default DisplayItinerary;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DisplayItinerary = () => {
    const [itinerary, setItinerary] = useState({});
    const location = useLocation();

    useEffect(() => {
        const { itineraryText } = location.state || {};
        if (itineraryText) {
            const extractedText = itineraryText.candidates[0].content.parts[0].text;
            console.log(extractedText);
            const parsedItinerary = parseItinerary(extractedText);
            setItinerary(parsedItinerary);
        } else {
            console.log("empty hai itinerary");
        }
    }, [location.state]);

    // Function to parse the itinerary string
    const parseItinerary = (extractedText) => {
        if (typeof extractedText === 'string') {
            const dayWiseItinerary = {};
    
            // Split by "Day X:" headers, but keep the delimiter for later use
            const days = extractedText.split(/(?=\*\*Day \d+:)/).filter(Boolean);
    
            days.forEach((dayText, index) => {
                // Extract day number (Day 1, Day 2, etc.)
                const dayNumber = `Day ${index + 1}`;
                const sections = {
                    Morning: '',
                    Afternoon: '',
                    Evening: ''
                };
    
                // Split by sections within each day
                const sectionsArray = dayText.split(/\*\*(Morning|Afternoon|Evening):\*\*/).filter(Boolean);
    
                // Iterate over sectionsArray to fill the sections object
                sectionsArray.forEach((section, sectionIndex) => {
                    if (sectionIndex > 0) { // Skip the first part which is the day title
                        const sectionHeader = sectionsArray[sectionIndex - 1].trim();
                        if (sectionHeader === 'Morning') {
                            sections.Morning = section.trim();
                        } else if (sectionHeader === 'Afternoon') {
                            sections.Afternoon = section.trim();
                        } else if (sectionHeader === 'Evening') {
                            sections.Evening = section.trim();
                        }
                    }
                });
    
                dayWiseItinerary[index + 1] = sections;
            });
    
            return dayWiseItinerary;
        } else {
            console.error("Invalid text format or undefined text");
            return {}; // Return an empty object if the text is not in the expected format
        }
    };
    

    // Render the itinerary
    return (
        <div>
            <h1>Trip Itinerary</h1>
            {Object.keys(itinerary).map(day => (
                <div key={day}>
                    <h2>Day {day}</h2>
                    <div><strong>Morning:</strong> <p>{itinerary[day].Morning || 'No activities planned'}</p></div>
                    <div><strong>Afternoon:</strong> <p>{itinerary[day].Afternoon || 'No activities planned'}</p></div>
                    <div><strong>Evening:</strong> <p>{itinerary[day].Evening || 'No activities planned'}</p></div>
                </div>
            ))}
        </div>
    );
};

export default DisplayItinerary;
