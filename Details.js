const Details = (  formattedDate,temp,temp_max,temp_min,main,icon) => {
  
const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`;  
    return `
        <li class="detail">
        <img class='city-icon' src="${iconUrl}" alt="icon">
            <h4>${formattedDate} </h4>
            <p>${main} ${Math.round(temp)}°C</p>   
        </li>
    `;
};

export default Details;