document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('trending-container');
  if (!container) return;

  fetch('./data/trending.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(function (items) {
      container.innerHTML = items
        .map(function (item, idx) {
          var i = idx + 1;
          return (
            '<a href="' + item.link + '" class="project-' + i + '">' +
            '<article class="project">' +
            '<img src="' + item.img + '" alt="' + (item.title || '') + '" class="project-img" />' +
            '<div class="project-info"><h4>' + item.title + '</h4><p>' + (item.subtitle || 'Click') + '</p></div>' +
            '</article></a>'
          );
        })
        .join('');
    })
    .catch(function (err) {
      console.error('Failed to load trending data:', err);
    });
});
