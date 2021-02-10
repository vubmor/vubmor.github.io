function mkBox(container, w, h) {
	var html = "<table cellpadding=\"0\" cellspacing=\"0\">",
		x, y;

	for (y = 0; y < h; y ++) {
		html += "<tr>";
		for (x = 0; x < w; x ++) {
			html += "<td pos-x=\"" + x + "\" pos-y=\"" + y + "\">&nbsp;</td>";
		}
		html += "</tr>";
	}
	html += "</table>";

	var min_width = 15,
		max_width = 250,
		size = Math.floor(225 / w);

	size = Math.min(max_width, size);
	size = Math.max(min_width, size);

	container.html(html);
	$("#box td").css({
		width: size,
		height: size
	});
}

$(document).ready(function () {
	var size,
		left = 0, step = 0,
		grids = [];

	function mkGame() {
		size = parseInt($("#size").val());
		if (isNaN(size) || size < 1) size = 2;
		// if (size > 50 && !confirm("生成过大的尺寸的网格可能需要较多时间，要继续吗？")) return;

		$("#size").val(size);

		left = size * size;
		step = 0;
		grids = [];
		for (var i = 0; i < left; i ++) {
			grids[i] = 1; // 初始状态，所有灯都亮着
		}

		mkBox($("#box"), size, size);
		updateStat();
	}

	function updateStat() {
		$("#left").html(left);
		$("#step").html(step);
	}

	function togglePos(x, y) {
		if (x >= 0 && x < size && y >= 0 && y < size) {
			var p = y * size + x;
			grids[p] = grids[p] == 0 ? 1 : 0;
			$($("#box td")[p]).toggleClass("off");
		}
	}

	mkGame();

	$("#size").click(function () {
		this.select();
	}).keydown(function (e) {
		if (e.keyCode == 13)
			mkGame();
	});
	$("#operation input[type=button]").click(mkGame);

	$("a#next").click(function () {
		//this.blur();
		$("#size").val(size + 1);
		mkGame();
		if (size > 1)
			$("a#previous").show();
		return false;
	});
	$("a#previous").click(function () {
		//this.blur();
		if (size <= 1) return;
		$("#size").val(size - 1);
		mkGame();

		if (size == 1)
			$(this).hide();

		return false;
	});

	$("#box td").live("mouseover", function () {
		$(this).addClass("hover");
	}).live("mouseout", function() {
		$(this).removeClass("hover");
	}).live("click", function () {
		step ++;

		// 当前格子被点击了
		var x = parseInt(this.getAttribute("pos-x")),
			y = parseInt(this.getAttribute("pos-y"));

		togglePos(x, y);
		togglePos(x + 1, y);
		togglePos(x - 1, y);
		togglePos(x, y + 1);
		togglePos(x, y - 1);

		var i, l;
		l = grids.length;
		left = 0;
		for (i = 0; i < l; i ++)
			left += grids[i];

		updateStat();

		if (left == 0 && size == 5){
			alert("恭喜 Part 2 全部通关👏\n红包口令的第四个数字是：\n下一关的通关口令不在这里哦😜\n\nby Binary");
			window.opener.location.href = window.opener.location.href;
			window.close();

		}
		if (left == 0 && size == 4){
			alert("恭喜通过本小关😁\n红包口令的第三个数字是：");
			size += 1
			left = size * size;
			step = 0;
			grids = [];
			for (var i = 0; i < left; i ++) {
				grids[i] = 1; // 初始状态，所有灯都亮着
			}

			mkBox($("#box"), size , size);
			updateStat();
			}
		if (left == 0 && size == 3){
			alert("恭喜通过本小关😁\n红包口令的第二个数字是：");
			size += 1;
			left = size * size;
			step = 0;
			grids = [];
			for (var i = 0; i < left; i ++) {
				grids[i] = 1; // 初始状态，所有灯都亮着
			}

			mkBox($("#box"), size , size);
			updateStat();}
		if (left == 0 && size == 2){
			alert("恭喜通过本小关😁\n红包口令的第一个数字是：");
			size += 1;
			left = size * size;
			step = 0;
			grids = [];
			for (var i = 0; i < left; i ++) {
				grids[i] = 1; // 初始状态，所有灯都亮着
			}

			mkBox($("#box"), size, size);
			updateStat();}

	});
});