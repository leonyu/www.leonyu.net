

// TODO: Convert this to more object oriented

$(document).ready(function () {
	$('.tab-panes > section').eq(0).text('Calling from GitHub API...');
	$.getJSON('https://api.github.com/users/leonyu/repos?callback=?', function (data, status, xhr) {
		$('.tab-panes > section').eq(0).empty();
		$.each(data.data, function (i, v) {
			if (v.name == 'leonyu.net'|| v.name == 'leonyu.github.com') {
				return;
			}
			var assignedTab;
			switch (v.language) {
				case 'JavaScript':
					assignedTab = '#js';
					break;
				case 'C#':
					assignedTab = '#dotnet';
					break;
				case 'PHP':
					assignedTab = '#php';
					break;
				case 'C':
				case 'C++':
					assignedTab = '#cpp';
					break;
				case 'Lua':
					assignedTab = '#lua';
					break;
				default:
					assignedTab = '#others';
					break;
			}

			var $article = $('<article><h2></h2><ul></ul><p></p></article>');
			$article.find('h2').text(v.name);
			$article.find('p').text(v.description);
			if (v.homepage != '') {
				var $li = $('<li><a href="#">Demonstration</a></li>');
				$li.find('a').attr({
					'href': v.homepage
				});
				$article.find('ul').append($li);
			}
			if (v.html_url != '') {
				var $li = $('<li><a href="#">Source Code</a></li>');
				$li.find('a').attr({
					'href': v.html_url
				});
				$article.find('ul').append($li);
			}
			$(assignedTab).append($article);
		});


		$('.tabs').tabs('.tab-panes > section', { history: true }).delegate('a.current', 'click', function(evt){ evt.preventDefault(); });
		});
	});
