// Gráfico por Categoria
const categorias = {};
noticias.forEach(n => {
  categorias[n.categoria] = (categorias[n.categoria] || 0) + 1;
});
const ctx = document.getElementById('categoryChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(categorias),
    datasets: [{
      label: 'Número de Notícias',
      data: Object.values(categorias),
      backgroundColor: ['#0074D9', '#FF4136', '#2ECC40', '#FF851B']
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } }
  }
});

// FullCalendar
document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: noticias.map(n => ({
      title: n.titulo,
      date: n.data
    }))
  });
  calendar.render();
});

// Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2t2ZWdwaWZ5MGFtNzJ2cGRjc29hYXU1aCJ9.YOUR_ACCESS_TOKEN';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-47.8825, -15.7942],
  zoom: 3.5
});

const coordenadas = {
  "Brasília": [-47.8825, -15.7942],
  "São Paulo": [-46.6333, -23.5505],
  "Rio de Janeiro": [-43.1729, -22.9068],
  "Salvador": [-38.5014, -12.9714],
  "Curitiba": [-49.2731, -25.4284]
};

noticias.forEach(n => {
  if (coordenadas[n.local]) {
    new mapboxgl.Marker()
      .setLngLat(coordenadas[n.local])
      .setPopup(new mapboxgl.Popup().setText(n.titulo))
      .addTo(map);
  }
});