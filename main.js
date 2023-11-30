// Load your data from CSV
d3.csv('Red_Light_Camera_ViolationsPreprocessed_a.csv').then(data => {
    // Your data processing code here

    // Initial visualization type
    let currentVisualization = 'year';

    // Create a dropdown menu
    const dropdown = d3.select('#timeDropdown');

    dropdown.on('change', () => {
        // Update current visualization type
        currentVisualization = dropdown.node().value;
        updateVisualization();
    });

    // Function to update the visualization based on the selected type
    function updateVisualization() {
        // Clear previous visualization
        d3.select('#visualization').html('');

        // Check the selected type and create the corresponding visualization
        if (currentVisualization === 'year') {
            createYearlyBarChart(data);
           // createMonthlyBubbleChart(data,selectedYear);
           
        } else if (currentVisualization === 'month') {
            createMonthlyBarChart(data);
        }
        else if (currentVisualization === 'week') {
            createWeeklyBarChart(data);
        }
        // Add more conditions for other visualization types if needed
    }

    // Initial update
    updateVisualization();
});

// // Function to create a yearly pie chart
// function createYearlyPieChart(data) {
//     // D3 code for creating a yearly pie chart
//     // ...

//     // Example code:
//     const yearlyData = d3.nest()
//         .key(d => d.Year)
//         .rollup(d => d3.sum(d, v => v.VIOLATIONS))
//         .entries(data);

//     const width = 300;
//     const height = 300;
//     const radius = Math.min(width, height) / 2;

//     const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//     const svg = d3.select('#visualization')
//         .append('svg')
//         .attr('width', width)
//         .attr('height', height)
//         .append('g')
//         .attr('transform', `translate(${width / 2},${height / 2})`);

//     const arc = d3.arc()
//         .innerRadius(0)
//         .outerRadius(radius);

//     const pie = d3.pie()
//         .value(d => d.value);

//     const arcs = svg.selectAll('arc')
//         .data(pie(yearlyData))
//         .enter()
//         .append('g')
//         .attr('class', 'arc');

//     arcs.append('path')
//         .attr('d', arc)
//         .attr('fill', (d, i) => colorScale(i))
//         .attr('stroke', 'white')
//         .style('stroke-width', '2px');

//     arcs.append('text')
//         .attr('transform', d => `translate(${arc.centroid(d)})`)
//         .attr('text-anchor', 'middle')
//         .text(d => d.data.key)
//         .style('fill', 'white');
// }

// Define tooltip style



// Function to create a yearly bar chart
function createYearlyBarChart(data) {
    // D3 code for creating a yearly bar chart
    // ...

    // Example code:
    const yearlyData = d3.nest()
        .key(d => d.Year)
        .rollup(d => d3.sum(d, v => v.VIOLATIONS))
        .entries(data);

    const margin = { top: 10, right: 40, bottom: 30, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select('#visualization')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(yearlyData.map(d => d.key))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(yearlyData, d => d.value)])
        .range([height, 0]);

    svg.selectAll('rect')
        .data(yearlyData)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.key))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.value))
        .attr('fill', 'steelblue')
        .attr('cursor', 'pointer') // Change cursor to pointer on hover
        .on('click', function (event, d) {
            // Show bubble chart for the selected year
            createMonthlyBubbleChart(data, d.key);
        });
        // .on('mouseover', function (event, d) {
        //     // Show tooltip on hover
        //     d3.select(this)
        //         .attr('fill', 'orange'); // Change color on hover
            
        // })
        // .on('mouseout', function () {
        //     // Hide tooltip on mouseout
        //     d3.select(this)
        //         .attr('fill', 'steelblue'); // Restore original color
          
        // })

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(yScale));

    // Add labels
    svg.append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.top + 20) // Increased space
    .attr('text-anchor', 'middle')
    .text('Year');
       

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0 - height / 2)
        .attr('y', 0 - margin.left)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text('Total Violations');

        
}

// // Function to create a monthly bar chart
// function createMonthlyVisualization(data) {
//     const monthlyData = d3.nest()
//         .key(d => d.Month)
//         .rollup(d => d3.sum(d, v => v.VIOLATIONS))
//         .entries(data);

//     const margin = { top: 20, right: 20, bottom: 60, left: 60 };
//     const width = 400 - margin.left - margin.right;
//     const height = 300 - margin.top - margin.bottom;

//     const x = d3.scaleBand()
//         .range([0, width])
//         .padding(0.1)
//         .domain(monthlyData.map(d => d.key));

//     const y = d3.scaleLinear()
//         .range([height, 0])
//         .domain([0, d3.max(monthlyData, d => d.value)]);

//     const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//     const svg = d3.select('#visualization')
//         .append('svg')
//         .attr('width', width + margin.left + margin.right)
//         .attr('height', height + margin.top + margin.bottom)
//         .append('g')
//         .attr('transform', `translate(${margin.left},${margin.top})`);

//     svg.selectAll('.bar')
//         .data(monthlyData)
//         .enter().append('rect')
//         .attr('class', 'bar')
//         .attr('x', d => x(d.key))
//         .attr('width', x.bandwidth())
//         .attr('y', d => y(d.value))
//         .attr('height', d => height - y(d.value))
//         .attr('fill', (d, i) => colorScale(i))
//         .on('mouseover', function (event, d) {
//             const tooltip = d3.select('#tooltip');
//             tooltip.html(`<strong>${d.key}</strong><br>Violations: ${d.value}`)
//                 .style('visibility', 'visible');
//         })
//         .on('mousemove', function (event) {
//             const tooltip = d3.select('#tooltip');
//             tooltip.style('top', (event.pageY - 10) + 'px')
//                 .style('left', (event.pageX + 10) + 'px');
//         })
//         .on('mouseout', function () {
//             const tooltip = d3.select('#tooltip');
//             tooltip.style('visibility', 'hidden');
//         });

//     svg.append('g')
//         .attr('transform', `translate(0,${height})`)
//         .call(d3.axisBottom(x))
//         .selectAll('text')
//         .attr('transform', 'rotate(-45)')
//         .style('text-anchor', 'end');

//     svg.append('g')
//         .call(d3.axisLeft(y));
// }
// Function to create a monthly bar chart
function createMonthlyBarChart(data) {
    // D3 code for creating a monthly bar chart
    // ...

    // Example code:
    const monthlyData = d3.nest()
        .key(d => d.Month)
        .rollup(d => d3.sum(d, v => v.VIOLATIONS))
        .entries(data);

    const margin = { top: 20, right: 30, bottom: 30, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select('#visualization')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(monthlyData.map(d => d.key))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(monthlyData, d => d.value)])
        .range([height, 0]);

    svg.selectAll('rect')
        .data(monthlyData)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.key))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.value))
        .attr('fill', 'steelblue').attr('cursor', 'pointer') // Change cursor to pointer on hover
        .on('mouseover', function (event, d) {
            // Show tooltip on hover
            d3.select(this)
                .attr('fill', 'orange'); // Change color on hover
            
        })
        .on('mouseout', function () {
            // Hide tooltip on mouseout
            d3.select(this)
                .attr('fill', 'steelblue'); // Restore original color
          
        });

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(yScale));

    // Add labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 10)
        .attr('text-anchor', 'middle')
        .text('Month');

        svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0 - height / 2)
        .attr('y', 0 - margin.left)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text('Total Violations');
}


function createWeeklyBarChart(data) {
    // D3 code for creating a weekly bar chart
    // ...

    // Example code:
    const weeklyData = d3.nest()
        .key(d => d.Week)
        .rollup(d => d3.sum(d, v => v.VIOLATIONS))
        .entries(data);

    const margin = { top: 20, right: 30, bottom: 30, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select('#visualization')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(weeklyData.map(d => d.key))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(weeklyData, d => d.value)])
        .range([height, 0]);

    svg.selectAll('rect')
        .data(weeklyData)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.key))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.value))
        .attr('fill', 'steelblue').attr('cursor', 'pointer') // Change cursor to pointer on hover
        .on('mouseover', function (event, d) {
            // Show tooltip on hover
            d3.select(this)
                .attr('fill', 'orange'); // Change color on hover
            
        })
        .on('mouseout', function () {
            // Hide tooltip on mouseout
            d3.select(this)
                .attr('fill', 'steelblue'); // Restore original color
          
        });

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(yScale));

    // Add labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 10)
        .attr('text-anchor', 'middle')
        .text('Week');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0 - height / 2)
        .attr('y', 0 - margin.left)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text('Total Violations');
}

// Function to create a bubble chart for monthly violations of a specific year
function createMonthlyBubbleChart(data, selectedYear) {
    // Filter data for the selected year
    const monthlyData = data.filter(d => d.Year === selectedYear);

    // Group data by month and calculate total violations per month
    const monthlyViolations = d3.nest()
        .key(d => d.Month)
        .rollup(d => d3.sum(d, v => v.VIOLATIONS))
        .entries(monthlyData);

    // Convert month names to numbers for scale
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthScale = d3.scaleBand()
        .domain(months)
        .range([0, 600])
        .padding(0.1);

    const maxViolations = d3.max(monthlyViolations, d => d.value);

    const radiusScale = d3.scaleSqrt()
        .domain([0, maxViolations])
        .range([0, 50]);

    const svg = d3.select('#bubbleChart')
        .append('svg')
        .attr('width', 800)
        .attr('height', 400);

    svg.selectAll('circle')
        .data(monthlyViolations)
        .enter()
        .append('circle')
        .attr('cx', d => monthScale(d.key))
        .attr('cy', 200)
        .attr('r', d => radiusScale(d.value))
        .attr('fill', 'steelblue')
        .attr('opacity', 0.7)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .append('title') // Tooltip
        .text(d => `Month: ${d.key}\nViolations: ${d.value}`);
}






d3.csv('Red_Light_Camera_ViolationsPreprocessed_a.csv').then(data => {
    // Convert the string coordinates to numbers
    data.forEach(d => {
        d.LATITUDE = +d.LATITUDE;
        d.LONGITUDE = +d.LONGITUDE;
        d['VIOLATION DATE'] = new Date(d['VIOLATION DATE']);
    });

    const map = L.map('map').setView([41.8781, -87.6298], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const svgLayer = L.svg();
    svgLayer.addTo(map);

    const svg = d3.select("#map").select("svg");

    const circles = data.map(d => {
        const circle = L.circleMarker([d.LATITUDE, d.LONGITUDE], { radius: 8 })
            .addTo(map)
            .bindPopup(`Intersection: ${d.INTERSECTION}<br>Camera ID: ${d['CAMERA ID']}`);
        
        circle.cameraId = d['CAMERA ID']; // Set the camera ID directly on the circle
        circle.year = d3.timeFormat("%Y")(d['VIOLATION DATE']);
        circle.violations = d.VIOLATIONS;

        circle.on('click', function (event) {
            const cameraData = data.filter(entry => entry['CAMERA ID'] === this.cameraId);
            const yearsData = cameraData.map(entry => ({ year: d3.timeFormat("%Y")(entry['VIOLATION DATE']), violations: entry.VIOLATIONS }));
            showBarChart(yearsData);
        });

        return circle;
    });

    function showBarChart(data) {
        const barChartContainer = d3.select("#bar-charts");
        barChartContainer.html("");  // Clear previous content

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 400 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svgBarChart = barChartContainer.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.violations)])
            .range([height, 0]);

        svgBarChart.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.year))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.violations))
            .attr("height", d => height - y(d.violations));

        // Add x-axis
        svgBarChart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add y-axis
        svgBarChart.append("g")
            .call(d3.axisLeft(y));

        // Add labels
        svgBarChart.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 10)
            .attr("text-anchor", "middle")
            .text("Year");

        svgBarChart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0 - height / 2)
            .attr("y", 0 - margin.left)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text("Violations");
    }
});




const dataUrl = 'Red_Light_Camera_Violations';


// Load Vega-Lite specifications for each visualization
const specs = {

    PieChart:'Task_2_viz_3.json',

    // Add other visualization names and corresponding specification file paths
};

// Function to embed Vega-Lite visualizations
function embedVisualization(spec, targetElement) {
    fetch(spec)  // Load Vega-Lite specification
        .then(response => response.json())
        .then(specification => {
            // Embed the visualization into the target element
            vegaEmbed(targetElement, specification, { data: { url: dataUrl } })
                .catch(console.error);
        })
        .catch(console.error);
}

// Embed each visualization into its corresponding section
for (const [visualization, specFile] of Object.entries(specs)) {
    embedVisualization(specFile, `#${visualization}`);
}























// d3.csv('Red_Light_Camera_ViolationsPreprocessed_a.csv').then(data => {
//     // Convert the string coordinates to numbers
//     data.forEach(d => {
//         d.LATITUDE = +d.LATITUDE;
//         d.LONGITUDE = +d.LONGITUDE;
//         d['VIOLATION DATE'] = new Date(d['VIOLATION DATE']);
//     });

//     const map = L.map('map').setView([41.8781, -87.6298], 12);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//     }).addTo(map);

//     const svgLayer = L.svg();
//     svgLayer.addTo(map);

//     const svg = d3.select("#map").select("svg");

//     const circles = data.map(d => {
//         const circle = L.circleMarker([d.LATITUDE, d.LONGITUDE], { radius: 8 })
//             .addTo(map)
//             .bindPopup(`Intersection: ${d.INTERSECTION}<br>Year: ${d3.timeFormat("%Y")(d['VIOLATION DATE'])}<br>Violations: ${d.VIOLATIONS}`);
        
//         circle.cameraId = d['CAMERA ID']; // Set the camera ID directly on the circle

//         circle.on('click', function (event) {
//             showBarChart(this.cameraId);
//         });

//         return circle;
//     });

//     function showBarChart(cameraId) {
//         const cameraData = data.filter(entry => entry['CAMERA ID'] === cameraId);

//         const barChartContainer = d3.select("#bar-charts");
//         barChartContainer.html("");  // Clear previous content

//         const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//         const width = 400 - margin.left - margin.right;
//         const height = 300 - margin.top - margin.bottom;

//         const svgBarChart = barChartContainer.append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         const x = d3.scaleBand()
//             .domain(cameraData.map(d => d3.timeFormat("%Y")(d['VIOLATION DATE'])))
//             .range([0, width])
//             .padding(0.1);

//         const y = d3.scaleLinear()
//             .domain([0, d3.max(cameraData, d => d.VIOLATIONS)])
//             .range([height, 0]);

//         svgBarChart.selectAll(".bar")
//             .data(cameraData)
//             .enter().append("rect")
//             .attr("class", "bar")
//             .attr("x", d => x(d3.timeFormat("%Y")(d['VIOLATION DATE'])))
//             .attr("width", x.bandwidth())
//             .attr("y", d => y(d.VIOLATIONS))
//             .attr("height", d => height - y(d.VIOLATIONS));

//         // Add x-axis
//         svgBarChart.append("g")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x));

//         // Add y-axis
//         svgBarChart.append("g")
//             .call(d3.axisLeft(y));

//         // Add labels
//         svgBarChart.append("text")
//             .attr("x", width / 2)
//             .attr("y", height + margin.top + 10)
//             .attr("text-anchor", "middle")
//             .text("Year");

//         svgBarChart.append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("x", 0 - height / 2)
//             .attr("y", 0 - margin.left)
//             .attr("dy", "1em")
//             .attr("text-anchor", "middle")
//             .text("Violations");
//     }
// });

// d3.csv('Red_Light_Camera_ViolationsPreprocessed_a.csv').then(data => {
//     // Convert the string coordinates to numbers
//     data.forEach(d => {
//         d.LATITUDE = +d.LATITUDE;
//         d.LONGITUDE = +d.LONGITUDE;
//         d['VIOLATION DATE'] = new Date(d['VIOLATION DATE']);
//     });

//     const map = L.map('map').setView([41.8781, -87.6298], 12);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//     }).addTo(map);

//     const svgLayer = L.svg();
//     svgLayer.addTo(map);

//     const svg = d3.select("#map").select("svg");

//     const markers = data.map(d => {
//         const marker = L.marker([d.LATITUDE, d.LONGITUDE])
//             .addTo(map)
//             .bindPopup(`Intersection: ${d.INTERSECTION}<br>Violations: ${d.VIOLATIONS}`);
        
//         marker.cameraId = d['CAMERA ID']; // Set the camera ID directly on the marker

//         marker.on('click', function (event) {
//             showAreaChart(this.cameraId);
//         });

//         return marker;
//     });

//     function showAreaChart(cameraId) {
//         const cameraData = data.filter(entry => entry['CAMERA ID'] === cameraId);

//         const areaChartContainer = d3.select("#area-chart");
//         areaChartContainer.html("");  // Clear previous content

//         const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//         const width = 400 - margin.left - margin.right;
//         const height = 300 - margin.top - margin.bottom;

//         const svgAreaChart = areaChartContainer.append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         const x = d3.scaleTime()
//             .domain(d3.extent(cameraData, d => d['VIOLATION DATE']))
//             .range([0, width]);

//         const y = d3.scaleLinear()
//             .domain([0, d3.max(cameraData, d => d.VIOLATIONS)])
//             .range([height, 0]);

//         const area = d3.area()
//             .x(d => x(d['VIOLATION DATE']))
//             .y0(height)
//             .y1(d => y(d.VIOLATIONS));

//         svgAreaChart.append("path")
//             .datum(cameraData)
//             .attr("fill", "steelblue")
//             .attr("d", area);

//         svgAreaChart.append("g")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x));

//         svgAreaChart.append("g")
//             .call(d3.axisLeft(y));

//         svgAreaChart.append("text")
//             .attr("x", width / 2)
//             .attr("y", height + margin.top + 10)
//             .attr("text-anchor", "middle")
//             .text("Date");

//         svgAreaChart.append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("x", 0 - height / 2)
//             .attr("y", 0 - margin.left)
//             .attr("dy", "1em")
//             .attr("text-anchor", "middle")
//             .text("Violations");
//     }
// });


// d3.csv('Red_Light_Camera_ViolationsPreprocessed.csv').then(data => {
//     // Convert the string coordinates to numbers
//     data.forEach(d => {
//         d.LATITUDE = +d.LATITUDE;
//         d.LONGITUDE = +d.LONGITUDE;
//         d['VIOLATION DATE'] = new Date(d['VIOLATION DATE']);
//     });

//     const map = L.map('map').setView([41.8781, -87.6298], 12);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//     }).addTo(map);

//     const svgLayer = L.svg();
//     svgLayer.addTo(map);

//     const svg = d3.select("#map").select("svg");

//     const markers = data.map(d => {
//         const marker = L.marker([d.LATITUDE, d.LONGITUDE])
//             .addTo(map)
//             .bindPopup(`Intersection: ${d.INTERSECTION}<br>Violations: ${d.VIOLATIONS}`);
        
//         marker.cameraId = d['CAMERA ID']; // Set the camera ID directly on the marker

//         marker.on('click', function (event) {
//             showLineChart(this.cameraId);
//         });

//         return marker;
//     });

//     function showLineChart(cameraId) {
//         const cameraData = data.filter(entry => entry['CAMERA ID'] === cameraId);

//         const lineChartContainer = d3.select("#line-chart");
//         lineChartContainer.html("");  // Clear previous content

//         const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//         const width = 400 - margin.left - margin.right;
//         const height = 300 - margin.top - margin.bottom;

//         const svgLineChart = lineChartContainer.append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         const x = d3.scaleTime()
//             .domain(d3.extent(cameraData, d => d['VIOLATION DATE']))
//             .range([0, width]);

//         const y = d3.scaleLinear()
//             .domain([0, d3.max(cameraData, d => d.VIOLATIONS)])
//             .range([height, 0]);

//         const line = d3.line()
//             .x(d => x(d['VIOLATION DATE']))
//             .y(d => y(d.VIOLATIONS));

//         svgLineChart.append("path")
//             .datum(cameraData)
//             .attr("fill", "none")
//             .attr("stroke", "steelblue")
//             .attr("stroke-width", 1.5)
//             .attr("d", line);

//         svgLineChart.append("g")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x));

//         svgLineChart.append("g")
//             .call(d3.axisLeft(y));

//         svgLineChart.append("text")
//             .attr("x", width / 2)
//             .attr("y", height + margin.top + 10)
//             .attr("text-anchor", "middle")
//             .text("Date");

//         svgLineChart.append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("x", 0 - height / 2)
//             .attr("y", 0 - margin.left)
//             .attr("dy", "1em")
//             .attr("text-anchor", "middle")
//             .text("Violations");
//     }
// });

// d3.csv('Red_Light_Camera_ViolationsPreprocessed.csv').then(data => {
//     // Convert the string coordinates to numbers
//     data.forEach(d => {
//         d.LATITUDE = +d.LATITUDE;
//         d.LONGITUDE = +d.LONGITUDE;
//         d['VIOLATION DATE'] = new Date(d['VIOLATION DATE']);
//     });

//     const map = L.map('map').setView([41.8781, -87.6298], 12);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//     }).addTo(map);

//     const svgLayer = L.svg();
//     svgLayer.addTo(map);

//     const svg = d3.select("#map").select("svg");

//     const markers = data.map(d => {
//         const marker = L.marker([d.LATITUDE, d.LONGITUDE],{ cameraId: d['CAMERA ID'] }).addTo(map);
//         marker.bindPopup(`Intersection: ${d.INTERSECTION}<br>Violations: ${d.VIOLATIONS}`);
//         return marker;
//     });

//     function showBarChart(d) {
//         // You can use the camera ID (d['CAMERA ID']) to filter data and create a bar chart
//         const cameraId = d['CAMERA ID'];
//         const cameraData = data.filter(entry => entry['CAMERA ID'] === cameraId);

//         // Example: Create a simple bar chart using D3
//         const barChartContainer = d3.select("#bar-charts");
//         barChartContainer.html("");  // Clear previous content

//         const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//         const width = 400 - margin.left - margin.right;
//         const height = 300 - margin.top - margin.bottom;

//         const svgBarChart = barChartContainer.append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         const x = d3.scaleBand()
//             .domain(cameraData.map(d => d3.timeFormat("%Y")(d['VIOLATION DATE'])))
//             .range([0, width])
//             .padding(0.1);

//         const y = d3.scaleLinear()
//             .domain([0, d3.max(cameraData, d => d.VIOLATIONS)])
//             .range([height, 0]);

//         svgBarChart.selectAll(".bar")
//             .data(cameraData)
//             .enter().append("rect")
//             .attr("class", "bar")
//             .attr("x", d => x(d3.timeFormat("%Y")(d['VIOLATION DATE'])))
//             .attr("width", x.bandwidth())
//             .attr("y", d => y(d.VIOLATIONS))
//             .attr("height", d => height - y(d.VIOLATIONS));

//         // Add x-axis
//         svgBarChart.append("g")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x));

//         // Add y-axis
//         svgBarChart.append("g")
//             .call(d3.axisLeft(y));

//         // Add labels
//         svgBarChart.append("text")
//             .attr("x", width / 2)
//             .attr("y", height + margin.top + 10)
//             .attr("text-anchor", "middle")
//             .text("Year");

//         svgBarChart.append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("x", 0 - height / 2)
//             .attr("y", 0 - margin.left)
//             .attr("dy", "1em")
//             .attr("text-anchor", "middle")
//             .text("Total Violations");
//     }

//     // markers.forEach(marker => {
//     //     marker.on('click', event => {
//     //         showBarChart(event.target);
//     //     });
//     // });
//     markers.forEach(marker => {
//         marker.options = marker.options || {};
//         marker.options.cameraId = marker.options.cameraId || data[markers.indexOf(marker)]['CAMERA ID'];
//         marker.on('click', event => {
//             showBarChart(event.target);
//         });
//     })
// });

// // Load your red light violation data
// d3.csv('Red_Light_Camera_ViolationsPreprocessed.csv').then(data => {
//     // Convert the string coordinates to numbers
//     data.forEach(d => {
//         d.LATITUDE = +d.LATITUDE;
//         d.LONGITUDE = +d.LONGITUDE;
//     });

//     // Set up the map
//     const map = L.map('map').setView([41.8781, -87.6298], 12); // Chicago coordinates

//     // Add a tile layer to the map (you can choose different tile layers)
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//     }).addTo(map);

//     // Draw camera locations as bubbles
//     const svgLayer = L.svg();
//     svgLayer.addTo(map);

//     const svg = d3.select("#map").select("svg");

//     const circles = svg.selectAll(".bubble")
//         .data(data)
//         .enter().append("circle")
//         .attr("class", "bubble")
//         .attr("cx", d => map.latLngToLayerPoint([d.LATITUDE, d.LONGITUDE]).x)
//         .attr("cy", d => map.latLngToLayerPoint([d.LATITUDE, d.LONGITUDE]).y)
//         .attr("r", 5)
//         .on("click", showBarChart)
//         .on("mouseover", showTooltip)
//         .on("mouseout", hideTooltip);

//     // Function to show bar chart on bubble click
//     function showBarChart(d) {
//         // Filter data for the selected camera ID
//         const cameraData = data.filter(item => item['CAMERA ID'] === d['CAMERA ID']);

//         // Create a bar chart for yearly violations
//         createBarChart(cameraData, "#chart");
//     }

//     function createBarChart(data) {
//         // D3 code for creating a monthly bar chart
//         // ...
    
//         // Example code:
//         const monthlyData = d3.nest()
//             .key(d => d.Month)
//             .rollup(d => d3.sum(d, v => v.VIOLATIONS))
//             .entries(data);
    
//         const margin = { top: 20, right: 30, bottom: 30, left: 70 };
//         const width = 800 - margin.left - margin.right;
//         const height = 600 - margin.top - margin.bottom;
    
//         const svg = d3.select('#visualization')
//             .append('svg')
//             .attr('width', width + margin.left + margin.right)
//             .attr('height', height + margin.top + margin.bottom)
//             .append('g')
//             .attr('transform', `translate(${margin.left},${margin.top})`);
    
//         const xScale = d3.scaleBand()
//             .domain(monthlyData.map(d => d.key))
//             .range([0, width])
//             .padding(0.1);
    
//         const yScale = d3.scaleLinear()
//             .domain([0, d3.max(monthlyData, d => d.value)])
//             .range([height, 0]);
    
//         svg.selectAll('rect')
//             .data(monthlyData)
//             .enter()
//             .append('rect')
//             .attr('x', d => xScale(d.key))
//             .attr('y', d => yScale(d.value))
//             .attr('width', xScale.bandwidth())
//             .attr('height', d => height - yScale(d.value))
//             .attr('fill', 'steelblue').attr('cursor', 'pointer') // Change cursor to pointer on hover
//             .on('mouseover', function (event, d) {
//                 // Show tooltip on hover
//                 d3.select(this)
//                     .attr('fill', 'orange'); // Change color on hover
                
//             })
//             .on('mouseout', function () {
//                 // Hide tooltip on mouseout
//                 d3.select(this)
//                     .attr('fill', 'steelblue'); // Restore original color
              
//             });
    
//         // Add x-axis
//         svg.append('g')
//             .attr('transform', `translate(0,${height})`)
//             .call(d3.axisBottom(xScale));
    
//         // Add y-axis
//         svg.append('g')
//             .call(d3.axisLeft(yScale));
    
//         // Add labels
//         svg.append('text')
//             .attr('x', width / 2)
//             .attr('y', height + margin.top + 10)
//             .attr('text-anchor', 'middle')
//             .text('Month');
    
//             svg.append('text')
//             .attr('transform', 'rotate(-90)')
//             .attr('x', 0 - height / 2)
//             .attr('y', 0 - margin.left)
//             .attr('dy', '1em')
//             .attr('text-anchor', 'middle')
//             .text('Total Violations');
//     }

//     // Function to show tooltip on mouseover
//     function showTooltip(d) {
//         const tooltip = d3.select("#map")
//             .append("div")
//             .attr("class", "tooltip")
//             .html(`<strong>Intersection:</strong> ${d.INTERSECTION}<br><strong>Violations:</strong> ${d.VIOLATIONS}`)
//             .style("left", d3.event.pageX + "px")
//             .style("top", d3.event.pageY + "px");
//     }

//     // Function to hide tooltip on mouseout
//     function hideTooltip() {
//         d3.select(".tooltip").remove();
//     }

//     // Update circle positions when the map is panned or zoomed
//     map.on("moveend", updateCircles);

//     function updateCircles() {
//         circles
//             .attr("cx", d => map.latLngToLayerPoint([d.LATITUDE, d.LONGITUDE]).x)
//             .attr("cy", d => map.latLngToLayerPoint([d.LATITUDE, d.LONGITUDE]).y);
//     }
// });
