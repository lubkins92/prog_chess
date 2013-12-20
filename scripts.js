var socket;

//клик на ячейку
function push(el)
{
	if ((piece.posI == -1) && (change==0)) //если фишка еще  не выбрана и не надо менять пешку
	{
		if ((turn==0) && (color==0)) //если ход черными
		{
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "ladya")) paint(el);
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "kon")) paint(el);
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "slon")) paint(el);
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "korol")) paint(el);
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "ferz")) paint(el);
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "peshka")) paint(el);
		}
			
		else if ((turn==1) && (color==1)) //если ход белыми
		{
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "ladya")) paint(el);
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "kon")) paint(el);
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "slon")) paint(el);
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "korol")) paint(el);
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "ferz")) paint(el);
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "peshka")) paint(el);
		}
	}

	else if ((piece.posI != -1) && (change==0)) //если уже есть выбранная фишка и не надо менять пешку
		{
			piece.wantI = $(el).parent().parent().children().index($(el).parent());
			piece.wantJ = $(el).parent().children().index($(el));
			
			if ((turn==0) && (color==0)) //ход черных
			{
				if (($(el).attr("name") == "black") && ($(el).attr("type") != "free")) paint(el); 
				else { BlackTryGo();  } //clear();
			}
			else if ((turn==1) && (color==1))//ход белых
			{	
				if (($(el).attr("name") == "white") && ($(el).attr("type") != "free")) paint(el);
				else { WhiteTryGo(); }	//clear();
			}
		}
		
	else if ((change==1) && (turn==0) && (color==0))	//обмен черной пешки в конце поля
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border","4px solid orange");
		if (($(el).attr("type") == "ladya") || ($(el).attr("type") == "kon") || ($(el).attr("type") == "slon") ||($(el).attr("type") == "ferz"))
		{
			piece.wantI = $(el).parent().parent().children().index($(el).parent());
			piece.wantJ = $(el).parent().children().index($(el));
			if (BlackTryChange(el)== false) { alert("Обмен невозможен!!!"); clear(); }	
		}
		else 
		{
			alert("Обмен невозможен!!!"); clear();
		}
	}
	else if ((change==1) && (turn==1) && (color==1))	 //обмен белой пешки в конце поля
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border","4px solid orange");
		if (($(el).attr("type") == "ladya") || ($(el).attr("type") == "kon") || ($(el).attr("type") == "slon") ||($(el).attr("type") == "ferz"))
		{
			piece.wantI = $(el).parent().parent().children().index($(el).parent());
			piece.wantJ = $(el).parent().children().index($(el));
			if (WhiteTryChange(el)== false) { alert("Обмен невозможен!!!"); clear(); }	
		}
		else 
		{
			alert("Обмен невозможен!!!"); clear();
		}
	}	
}

//выделение ячейки
function paint(ch) 
{
	if (piece.posI == -1) //ни одна ячейка не выделена
	{			
		piece.posI = $(ch).parent().parent().children().index($(ch).parent());
		piece.posJ = $(ch).parent().children().index($(ch));
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border","4px solid orange");
	}
	
	else
	{
		if (($(ch).parent().children().index($(ch)) == piece.posJ) && ($(ch).parent().parent().children().index($(ch).parent()) == piece.posI)) //отжатие шашки
		{
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border","1px solid #006400");
			clear();
		}
		
		else
		{
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border","1px solid #006400");
			clear();
			piece.posI =$(ch).parent().parent().children().index($(ch).parent());
			piece.posJ = $(ch).parent().children().index($(ch));
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border","4px solid orange");
		}
	}
}

//очистка после хода
function clear()
{
	if (change==0)
	{
		piece.posI = -1;
		piece.posJ = -1;
		piece.wantI = -1;
		piece.wantJ = -1;
	}
	else
	{	
		piece.wantI = -1;
		piece.wantJ = -1;
	}
}

//ход черных фигур
function BlackTryGo()
{
	if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "peshka")) blpeshka();
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "ladya")) blladya(4);
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "kon")) blkon();
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "slon")) blslon(6);
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "ferz")) blferz(8);
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "korol")) blkorol();
}

//ход белых фигур
function WhiteTryGo()
{
	if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "white") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "peshka")) whpeshka();
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "white") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "ladya")) whladya(3);
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "white") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "kon")) whkon();
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "white") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "slon")) whslon(5);
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "white") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "ferz")) whferz(7);
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "white") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "korol")) whkorol();
}

function GO(xfrom, yfrom, xto, yto, newfigure)
{
	piece.posJ=xfrom; //текущая позиция I
	piece.posI=yfrom; //текущая позиция J
	piece.wantJ=xto; //Желаемая позиция (еще не перешли) J
	piece.wantI=yto; //Желаемая позиция (еще не перешли) I
	//newfigure=undefined;
	
	if ((turn==0) && (color==1)) BlackTryGo(); //ты черный, а ходят белые
	if ((turn==1) && (color==0)) WhiteTryGo(); //ты белый, а ходят черные
}

function emit()
{
	var i,j,ii,	jj;
	i=piece.posJ;
	j= piece.posI;
	ii=piece.wantJ;
	jj=piece.wantI;
	//if (peshkawho == null)
	 socket.emit("makeMove",{xfrom: j, yfrom: i, xto: jj, yto: ii,});
	 //else
	 //socket.emit("makeMove",{xfrom: piece.posJ, yfrom: piece.posI, xto: piece.wanJ, yto: piece.wanI,newfigure: peshkawho,});
}

function tturn()
{
	if ((turn==0) && (color==1)) color=0;
	if ((turn==1) && (color==0)) color=1;
	if ((turn==0) && (color==0)) { color=1; emit(); }
	if ((turn==1) && (color==1)) { color=0; emit(); }
}

// ходы для всех вариантов + проверка на шах и мат
function makeMove(type) 
{
	var choice=type;
	
	if (choice==1) { if (change1()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Белые прогиграли!");   socket.emit("gameOver"); } } 
	if (choice==2) { if (change2()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Черные прогиграли!");  socket.emit("gameOver"); } } 
	if (choice==3) { if (change3()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Черные прогиграли!");  socket.emit("gameOver"); } } 
	if (choice==4) { if (change4()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Белые прогиграли!");   socket.emit("gameOver"); } } 
	if (choice==5) { if (change5()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Черные прогиграли!");  socket.emit("gameOver"); } } 
	if (choice==6) { if (change6()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Белые прогиграли!");   socket.emit("gameOver"); } } 
	if (choice==7) { if (change7()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Черные прогиграли!");  socket.emit("gameOver"); } } 
	if (choice==8) { if (change8()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Белые прогиграли!");   socket.emit("gameOver"); } } 
	if (choice==9) { if (change9()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Черные прогиграли!");  socket.emit("gameOver"); } } 
	if (choice==10) { if (change10()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Белые прогиграли!"); socket.emit("gameOver"); } } 
	if (choice==11) { if (change11()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Черные прогиграли!");socket.emit("gameOver"); } } 
	if (choice==12) { if (change12()== false) return false; if (check()== false) tturn(); else { alert("Шах и мат! Белые прогиграли!"); socket.emit("gameOver"); } } 
}

//замена на черную пешку
function change1() 
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "black");
	$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "peshka");	
	$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
	$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
	
	turn=1;
	if (chah()==false)
	{
		turn=0;
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('6.png')");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
		return true;
		
	}
	else
	{
		turn=0;
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('6.png')");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "peshka");	
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);
		return false;
	}
}

//замена на белую пешку
function change2() 
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "white");
	$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "peshka");
	$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
	$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
	
	turn=0;
	if (chah()==false)
	{
		turn=1;
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('66.png')");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
		return true;
		
	}
	else
	{
		turn=1;
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('66.png')");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "peshka");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);
		return false;
	}
}

//замена на белую ладью
function change3() 
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");

	if (change==0)
	{
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "white");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "ladya");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
		
		turn=0;
		if (chah()==false)
		{
			turn=1;
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('33.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
			return true;
		}
		else
		{
			turn=1;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('33.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "ladya");
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);			
			return false;
		}	
	}
	else
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "ladya");
		
		turn=0;
		if (chah()==false)
		{
			turn=1; change=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('33.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			return true;
		}
		else
		{
			turn=1;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "peshka");
			return false;
		}	
	}	
}

//замена на черную ладью
function change4() 
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	if (change==0)
	{
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "black");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "ladya");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
		
		turn=1;
		if (chah()==false)
		{
			turn=0;
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('3.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
			return true;
		}
		else
		{
			turn=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('3.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "ladya");
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);			
			return false;
		}	
	}
	else
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "ladya");

		turn=1;
		if (chah()==false)
		{
			turn=0; change=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('3.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			return true;
		}
		else
		{
			turn=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "peshka");
			return false;
		}	
	}	
}

//замена на белого слона
function change5() 
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	if (change==0)
	{
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "white");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "slon");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
		
		turn=0;
		if (chah()==false)
		{
			turn=1;
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('44.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
			return true;
		}
		else
		{
			turn=1;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('44.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "slon");
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);			
			return false;
		}		
	}
	else
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "slon");
		
		turn=0;
		if (chah()==false)
		{
			turn=1; change=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('44.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			return true;
		}
		else
		{
			turn=1;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "peshka");
			return false;
		}		
	}	
}

//замена на черного слона
function change6() 
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	if (change==0)
	{
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "black");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "slon");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
		
		turn=1;
		if (chah()==false)
		{
			turn=0;
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('4.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
			return true;
		}
		else
		{
			turn=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('4.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "slon");
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);			
			return false;
		}			
	}
	else
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "slon");
		
		turn=1;
		if (chah()==false)
		{
			turn=0; change=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('4.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			return true;
		}
		else
		{
			turn=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "peshka");
			return false;
		}		
	}	
}

//замена на белого ферзя
function change7() 
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	if (change==0)
	{
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "white");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "ferz");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
		
		turn=0;
		if (chah()==false)
		{
			turn=1;
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('22.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
			return true;
		}
		else
		{
			turn=1;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('22.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "ferz");
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);			
			return false;
		}		
	}
	else
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "ferz");
		
		turn=0;
		if (chah()==false)
		{
			turn=1; change=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('22.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			return true;
		}
		else
		{
			turn=1;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "peshka");
			return false;
		}			
	}	
}

//замена на черного ферзя
function change8() 
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	if (change==0)
	{
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "black");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "ferz");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
		
		turn=1;
		if (chah()==false)
		{
			turn=0;
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('2.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
			return true;
		}
		else
		{
			turn=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('2.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "ferz");
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);			
			return false;
		}			
	}
	else
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "ferz");

		turn=1;
		if (chah()==false)
		{
			turn=0; change=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('2.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			return true;
		}
		else
		{
			turn=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "peshka");
			return false;
		}			
	}	
}

//замена на белого коня
function change9()
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	if (change==0)
	{
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "white");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "kon");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
		
		turn=0;
		if (chah()==false)
		{
			turn=1;
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('11.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
			return true;
		}
		else
		{
			turn=1;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('11.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "kon");
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);			
			return false;
		}		
	}
	else
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "kon");

		turn=0;
		if (chah()==false)
		{
			turn=1; change=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('11.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			return true;
		}
		else
		{
			turn=1;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "peshka");
			return false;
		}			
	}	
}

//замена на черного коня
function change10()
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	if (change==0)
	{
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "black");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "kon");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
		
		turn=1;
		if (chah()==false)
		{
			turn=0;
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('1.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
			return true;
		}
		else
		{
			turn=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('1.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "kon");
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
			$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);			
			return false;
		}			
	}
	else
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "kon");

		turn=1;
		if (chah()==false)
		{
			turn=0; change=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('1.png')");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			return true;
		}
		else
		{
			turn=0;
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
			$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "peshka");
			return false;
		}				
	}	
}

//замена на белого короля
function change11()
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "white");
	$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "korol");
	$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
	$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
	
	turn=0;
	if (chah()==false)
	{
		turn=1;
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('55.png')");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
		return true;
		
	}
	else
	{
		turn=1;
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('55.png')");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "white");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "korol");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);
		return false;
	}
}

//замена на черного короля
function change12()
{
	var name = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name");
	var type = $("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type");
	
	$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", "black");
	$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", "korol");
	$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "free");
	$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green");
	
	turn=1;
	if (chah()==false)
	{
		turn=0;
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").css("background-image", "url('5.png')");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "");	
		return true;
		
	}
	else
	{
		turn=0;
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("background-image", "url('5.png')");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name", "black");
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type", "korol");
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type", type);
		$("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("name", name);
		return false;
	}
}

// ход черной пешкой
function blpeshka() 
{
	var first_in=0;
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0;
	var caneat=0;
	var tp=1; //тип черная пешка
	
	if (search==1)
	{
		i = kor.whI;
		j = kor.whJ;
		ii = kor.figI;
		jj = kor.figJ;
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") != "free") caneat=1;
		if ((i==ii+1) && ((j==jj+1) || (j==jj-1)) && (caneat==1)) search=2;
	}
	else if (search==0)
	{
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		
		if (ii==1) first_in=1;
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") != "free") caneat=1; //значит в выбранной клетке стоит фигура, можно только есть 
		
		if ((i==ii+2) && (j==jj) && (first_in==1) && (caneat==0)) { fl=1; if (makeMove(tp)==false) fl=0; return true; } //первый ход пешки через клетку
		if ((i==ii+1) && (j==jj) && (caneat==0)) { fl=1; if (makeMove(tp)==false) fl=0; } //простой ход пешки
		if ((i==ii+1) && ((j==jj+1) || (j==jj-1)) && (caneat==1)) { fl=1; if (makeMove(tp)==false) fl=0; }
		
		if ((i==7) && (fl==1)) //если дошли до конца поля
		{
			change=1;
			piece.posI=i;
			piece.posJ=j;
			clear();
			turn=0;
			alert("Для смены пешки необходимо выделить фигуру, на которую следует ее поменять");
		}
		
		if (fl==0) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear();} 
	}
}

// ход белой пешкой
function whpeshka() 
{
	var first_in=0;
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0;
	var caneat=0;
	var tp=2; //тип белая пешка
	
	if (search==1)
	{
		i = kor.blI;
		j = kor.blJ;
		ii = kor.figI;
		jj = kor.figJ;
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") != "free") caneat=1;
		if ((i==ii-1) && ((j==jj+1) || (j==jj-1)) && (caneat==1)) search=2;
	}
	else if (search==0)
	{	
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		
		if (ii==6) first_in=1;
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") != "free") caneat=1;	//значит в выбранной клетке стоит фигура, можно только есть 
		
		if ((i==ii-2) && (j==jj) && (first_in==1) && (caneat==0)) { fl=1; if (makeMove(tp)==false) fl=0;  return true; } //первый ход пешки через клетку
		if ((i==ii-1) && (j==jj) && (caneat==0)) { fl=1; if (makeMove(tp)==false) fl=0;  } //простой ход пешки
		if ((i==ii-1) && ((j==jj+1) || (j==jj-1)) && (caneat==1)) { fl=1; if (makeMove(tp)==false) fl=0;  }
		
		if ((i==0) && (fl==1)) //если дошли до конца поля
		{
			change=1;
			piece.posI=i;
			piece.posJ=j;
			clear();
			turn=1;
			alert("Для смены пешки необходимо выделить фигуру, на которую следует ее поменять");
		}
		if (fl==0) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear();} 
	}
}

// ход белой ладьей
function whladya(type) 
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var k=0;
	var noteat=0;
	var tp=type; //3-тип белая ладья
	
	if (search==1)
	{
		i = kor.blI;
		j = kor.blJ;
		ii = kor.figI;
		jj = kor.figJ;
		
		if (((i!=ii) && (j!=jj)) && (tp==0)) return false; 
		if ((i==ii) || (j==jj))
		{
			if (i==ii)
			{
				if ((j==jj+1) || (j==jj-1)) { fl=1; search=2; }
				
				if ((j>jj) && (fl==0))
				{
					for(k = jj+1; k < j; k++)
					{
						if ($("tr:eq(" + i + ") > td:eq(" + k + ")").attr("type") != "free") noteat++;
					}
				}
				
				if ((j<jj) && (fl==0))
				{
					for(k = j+1; k < jj; k++)
					{
						if ($("tr:eq(" + i + ") > td:eq(" + k + ")").attr("type") != "free") noteat++;
					}
				}
			}
			else
			{
				if ((i==ii+1) || (i==ii-1)) { fl=1; search=2; }
				
				if ((i>ii) && (fl==0))
				{
					for(k = ii+1; k < i; k++)
					{
						if ($("tr:eq(" + k + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
					}
				}
				
				if ((i<ii) && (fl==0))
				{
					for(k = i+1; k < ii; k++)
					{
						if ($("tr:eq(" + k + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
					}
				}
			}
		}
		
		if (noteat==0) { search=2; return true; }
		if (noteat!=0)  return false; 	
	}
	else if (search==0)
	{
		if (((i!=ii) && (j!=jj)) && (tp==7)) return false; 
		if (((i!=ii) && (j!=jj)) && (tp!=7)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		if ((i==ii) || (j==jj))
		{
			if (i==ii)
			{
				if ((j==jj+1) || (j==jj-1)) { fl=1; if (makeMove(tp)==false) fl2=0; }
				
				if ((j>jj) && (fl==0))
				{
					for(k = jj+1; k < j; k++)
					{
						if ($("tr:eq(" + i + ") > td:eq(" + k + ")").attr("type") != "free") noteat++;
					}
				}
				
				if ((j<jj) && (fl==0))
				{
					for(k = j+1; k < jj; k++)
					{
						if ($("tr:eq(" + i + ") > td:eq(" + k + ")").attr("type") != "free") noteat++;
					}
				}
			}
			else
			{
				if ((i==ii+1) || (i==ii-1)) { fl=1; if (makeMove(tp)==false) fl2=0; }
				
				if ((i>ii) && (fl==0))
				{
					for(k = ii+1; k < i; k++)
					{
						if ($("tr:eq(" + k + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
					}
				}
				
				if ((i<ii) && (fl==0))
				{
					for(k = i+1; k < ii; k++)
					{
						if ($("tr:eq(" + k + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
					}
				}
			}
			
			if ((noteat==0) && (fl==0) && (fl2==1))  { if (makeMove(tp)==false) fl2=0; else return true; }
			if ((noteat!=0) && (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false;} 
		}
	}
}

// ход черной ладьей
function blladya(type) 
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var noteat=0;
	var k=0;
	var tp=type; //4-тип черная ладья
	
	if (search==1)
	{
		i = kor.whI;
		j = kor.whJ;
		ii = kor.figI;
		jj = kor.figJ;
		
		if (((i!=ii) && (j!=jj)) && (tp==0)) return false; 
		if ((i==ii) || (j==jj))
		{
			if (i==ii)
			{
				if ((j==jj+1) || (j==jj-1)) { fl=1; search=2; }
				
				if ((j>jj) && (fl==0))
				{
					for(k = jj+1; k < j; k++)
					{
						if ($("tr:eq(" + i + ") > td:eq(" + k + ")").attr("type") != "free") noteat++;
					}
				}
				
				if ((j<jj) && (fl==0))
				{
					for(k = j+1; k < jj; k++)
					{
						if ($("tr:eq(" + i + ") > td:eq(" + k + ")").attr("type") != "free") noteat++;
					}
				}
			}
			else
			{
				if ((i==ii+1) || (i==ii-1)) { fl=1; search=2; }
				
				if ((i>ii) && (fl==0))
				{
					for(k = ii+1; k < i; k++)
					{
						if ($("tr:eq(" + k + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
					}
				}
				
				if ((i<ii) && (fl==0))
				{
					for(k = i+1; k < ii; k++)
					{
						if ($("tr:eq(" + k + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
					}
				}
			}
		}
		
		if (noteat==0) { search=2; return true; }
		if (noteat!=0)  return false; 	
	}
	else if (search==0)
	{
		if (((i!=ii) && (j!=jj)) && (tp==8)) return false; 
		if (((i!=ii) && (j!=jj)) && (tp!=8)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		if ((i==ii) || (j==jj))
		{
			if (i==ii)
			{
				if ((j==jj+1) || (j==jj-1)) { fl=1; if (makeMove(tp)==false) fl2=0; }
				
				if ((j>jj) && (fl==0))
				{
					for(k = jj+1; k < j; k++)
					{
						if ($("tr:eq(" + i + ") > td:eq(" + k + ")").attr("type") != "free") noteat++;
					}
				}
				
				if ((j<jj) && (fl==0))
				{
					for(k = j+1; k < jj; k++)
					{
						if ($("tr:eq(" + i + ") > td:eq(" + k + ")").attr("type") != "free") noteat++;
					}
				}
			}
			else
			{
				if ((i==ii+1) || (i==ii-1)) { fl=1; if (makeMove(tp)==false) fl2=0; }
				
				if ((i>ii) && (fl==0))
				{
					for(k = ii+1; k < i; k++)
					{
						if ($("tr:eq(" + k + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
					}
				}
				
				if ((i<ii) && (fl==0))
				{
					for(k = i+1; k < ii; k++)
					{
						if ($("tr:eq(" + k + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
					}
				}
			}
			
			if ((noteat==0) && (fl==0) && (fl2==1))  { if (makeMove(tp)==false) fl2=0; else return true; }
			if ((noteat!=0) && (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false;} 
		}
	}
}

//замена черной пешки в конце поля
function BlackTryChange()  
{
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "ladya") if (makeMove(4)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "slon") if (makeMove(6)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "ferz") if (makeMove(8)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "kon") if (makeMove(10)==false) return false; else return true;
}

//замена белой пешки в конце поля
function WhiteTryChange()  
{
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "ladya") if (makeMove(3)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "slon") if (makeMove(5)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "ferz") if (makeMove(7)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "kon") if (makeMove(9)==false) return false; else return true;
}

// ход белым слоном
function whslon(type) 
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var k=0;
	var s=0;
	var noteat=0;
	var tp=type; //5-тип белый слон
	
	if (search==1)
	{
		i = kor.blI;
		j = kor.blJ;
		ii = kor.figI;
		jj = kor.figJ;
		
		if (((i==ii) || (j==jj)) && (tp==0)) return false; 
		if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) != ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title"))) return false; 
		if (((i==ii+1) || (i==ii-1)) && ((j==jj-1) || (j==jj+1)) && (fl==0)){ search=2; fl=1; return true; }
		if ((i>ii) && (fl==0)) //низ поля
		{
			if (j>jj)  //вправо
			{
				k=jj;
				for (s=ii+1;s<=i;s++)
				{
					if (k<=j) k++;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "korol")) { fl=1; break; }
					if (($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "korol")) noteat++;
				}				
				if ((noteat==0) && (fl==1)) { search=2; return true;}	
			}
			
			if ((j<jj) && (fl==0))  //влево
			{
				k=jj;
				for (s=ii+1; s<=i; s++)
				{
					if (k>=j) k=k-1;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "korol")) { fl=1; break; }
					if (($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "korol")) noteat++;
				}
				if ((noteat==0) && (fl==1)) { search=2; return true;}	
			}		
		}
		
		if ((i<ii) && (fl==0)) //верх поля
		{
			if (j>jj)  //вправо
			{
				k=jj;
				for (s=ii-1;s>=i;s=s-1)
				{
					if (k<=j) k++;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "korol")) { fl=1; break; }
					if (($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "korol")) noteat++;
				}				
				if ((noteat==0) && (fl==1)) { search=2; return true;}	
			}
			
			if ((j<jj) && (fl==0))  //влево
			{
				k=jj;
				for (s=ii-1;s>=i;s=s-1)
				{
					if (k>=j) k=k-1;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "korol")) { fl=1; break; }
					if (($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "korol")) noteat++;
				}
				if ((noteat==0) && (fl==1)) { search=2; return true;}	
			}
		}
	}
	else if (search==0)
	{
		if (((i==ii) || (j==jj)) && (tp==7)) return false;
		if ((($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) != ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title"))) && (tp==7)) return false; 	
		if ((($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) != ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title"))) && (tp!=7)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		if (((i==ii) || (j==jj)) && (tp!=7)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		if (((i==ii+1) || (i==ii-1)) && ((j==jj-1) || (j==jj+1)) && (fl==0)){ fl=1; if (makeMove(tp)==false) fl2=0;}
		if ((i>ii) && (fl==0)) //низ поля
		{
			if (j>jj)  //вправо
			{
				k=jj;
				for (s=ii+1;s<=i;s++)
				{
					if (k<=j) k++;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")) { fl=2; break; }
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "free")) { fl=2; break; }
					if ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")  { noteat++; break; }
				}
				if ((noteat==0) && (fl==2))  { fl=1; if (makeMove(tp)==false) fl2=0;}
			}
			
			if ((j<jj) && (fl==0))  //влево
			{
				k=jj;
				for (s=ii+1; s<=i; s++)
				{
					if (k>=j) k=k-1;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")) { fl=2; break; }
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "free")) { fl=2; break; }
					if ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")  { noteat++; break; }		
				}
				if ((noteat==0) && (fl==2))  { fl=1; if (makeMove(tp)==false) fl2=0;}
			}
		}
		
		if ((i<ii) && (fl==0)) //верх поля
		{
			if (j>jj)  //вправо
			{
				k=jj;
				for (s=ii-1;s>=i;s=s-1)
				{
					if (k<=j) k++;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")) { fl=2; break; }
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "free")) { fl=2; break; }
					if ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") { noteat++; break; }
				}			
				if ((noteat==0) && (fl==2))  { fl=1; if (makeMove(tp)==false) fl2=0;}
			}
			
			if ((j<jj) && (fl==0))  //влево
			{
				k=jj;
				for (s=ii-1; s>=i; s=s-1)
				{
					if (k>=j) k=k-1;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")) { fl=2; break; }
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "free")) { fl=2; break; }
					if ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") { noteat++; break; }
				}
				if ((noteat==0) && (fl==2))  { fl=1; if (makeMove(tp)==false) fl2=0;}
			}
		}
		if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		else return true;	
	}
}

// ход черным слоном
function blslon(type) 
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var k=0;
	var s=0;
	var noteat=0;
	var tp=type; //6-тип черный слон
	
	if (search==1)
	{
		i = kor.whI;
		j = kor.whJ;
		ii = kor.figI;
		jj = kor.figJ;
		
		if (((i==ii) || (j==jj)) && (tp==0)) return false; 
		if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) != ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title"))) return false; 
		if (((i==ii+1) || (i==ii-1)) && ((j==jj-1) || (j==jj+1)) && (fl==0)){ search=2; fl=1; return true; }
		if ((i>ii) && (fl==0)) //низ поля
		{
			if (j>jj)  //вправо
			{
				k=jj;
				for (s=ii+1;s<=i;s++)
				{
					if (k<=j) k++;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "korol")) { fl=1; break; }
					if (($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "korol")) noteat++;
				}				
				if ((noteat==0) && (fl==1)) { search=2; return true;}	
			}
			
			if ((j<jj) && (fl==0))  //влево
			{
				k=jj;
				for (s=ii+1; s<=i; s++)
				{
					if (k>=j) k=k-1;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "korol")) { fl=1; break; }
					if (($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "korol")) noteat++;
				}
				if ((noteat==0) && (fl==1)) { search=2; return true;}	
			}		
		}
		
		if ((i<ii) && (fl==0)) //верх поля
		{
			if (j>jj)  //вправо
			{
				k=jj;
				for (s=ii-1;s>=i;s=s-1)
				{
					if (k<=j) k++;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "korol")) { fl=1; break; }
					if (($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "korol")) noteat++;
				}				
				if ((noteat==0) && (fl==1)) { search=2; return true;}	
			}
			
			if ((j<jj) && (fl==0))  //влево
			{
				k=jj;
				for (s=ii-1;s>=i;s=s-1)
				{
					if (k>=j) k=k-1;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "korol")) { fl=1; break; }
					if (($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "korol")) noteat++;
				}
				if ((noteat==0) && (fl==1)) { search=2; return true;}	
			}
		}
	}
	else if (search==0)
	{
		if (((i==ii) || (j==jj)) && (tp==8)) return false;
		if ((($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) != ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title"))) && (tp==8)) return false; 	
		if ((($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) != ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title"))) && (tp!=8)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }	
		if (((i==ii) || (j==jj)) && (tp!=8)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		if (((i==ii+1) || (i==ii-1)) && ((j==jj-1) || (j==jj+1)) && (fl==0)) { fl=1; if (makeMove(tp)==false) fl2=0;}
		if ((i>ii) && (fl==0)) //низ поля
		{
			if (j>jj)  //вправо
			{
				k=jj;
				for (s=ii+1;s<=i;s++)
				{
					if (k<=j) k++;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")) { fl=2; break; }
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "free")) { fl=2; break; }
					if ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")  { noteat++; break; }
				}
				if ((noteat==0) && (fl==2)) { fl=1; if (makeMove(tp)==false) fl2=0;}
			}
			
			if ((j<jj) && (fl==0))  //влево
			{
				k=jj;
				for (s=ii+1; s<=i; s++)
				{
					if (k>=j) k=k-1;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")) { fl=2; break; }
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "free")) { fl=2; break; }
					if ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")  { noteat++; break; }		
				}
				if ((noteat==0) && (fl==2)) { fl=1; if (makeMove(tp)==false) fl2=0;}
			}
		}
		
		if ((i<ii) && (fl==0)) //верх поля
		{
			if (j>jj)  //вправо
			{
				k=jj;
				for (s=ii-1;s>=i;s=s-1)
				{
					if (k<=j) k++;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")) { fl=2; break; }
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "free")) { fl=2; break; }
					if ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") { noteat++; break; }
				}
				if ((noteat==0) && (fl==2)) { fl=1; if (makeMove(tp)==false) fl2=0;}
			}
			
			if ((j<jj) && (fl==0))  //влево
			{
				k=jj;
				for (s=ii-1;s>=i;s=s-1)
				{
					if (k>=j) k=k-1;
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free")) { fl=2; break; }
					if ((s==i) && (k==j) && ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") == "free")) { fl=2; break; }
					if ($("tr:eq(" + s + ") > td:eq(" + k + ")").attr("type") != "free") { noteat++; break; }
				}
				if ((noteat==0) && (fl==2)) { fl=1; if (makeMove(tp)==false) fl2=0;}
			}
		}
		if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		else return true;	 		
	}
}
	
//ход белым ферзем	
function whferz()
{
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0;
	
	if (search==1)
	{
		if ((whslon(0)!=true) && (whladya(0)!=true)) return false;
		else return true;
	}
	else if (search==0)
	{
		if ((whslon(7)!=true)) { piece.posI=ii; piece.posJ=jj; fl=1; }
		if (((whladya(7)!=true)) && (fl==1)) return false;
		else return true;	
	}
}	

//ход черным ферзем
function blferz()
{
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0;
	
	if (search==1)
	{
		if ((blslon(0)!=true) && (blladya(0)!=true)) return false;
		else return true;
	}
	else if (search==0)
	{
		if ((blslon(8)!=true)) { piece.posI=ii; piece.posJ=jj; fl=1; }
		if (((blladya(8)!=true)) && (fl==1)) return false;
		else return true;
	}
}	
	
//ход белым конем	
function whkon()
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var tp=9; //тип белый конь
	
	if (search==1)
	{
		i = kor.blI;
		j = kor.blJ;
		ii = kor.figI;
		jj = kor.figJ;
		
		if ((i==ii+1) && ((j==jj+2) || (j==jj-2))) { search=2; return true; }
		if ((i==ii+2) && ((j==jj+1) || (j==jj-1))) { search=2; return true; }
		if ((i==ii-1) && ((j==jj+2) || (j==jj-2))) { search=2; return true; }
		if ((i==ii-2) && ((j==jj+1) || (j==jj-1))) { search=2; return true; }
		else return false;
	}
	else if (search==0)
	{
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		if ((i==ii+1) && ((j==jj+2) || (j==jj-2))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii+2) && ((j==jj+1) || (j==jj-1))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii-1) && ((j==jj+2) || (j==jj-2))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii-2) && ((j==jj+1) || (j==jj-1))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		
		if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false;}
		else return true;	
	}
}	

//ход черным конем	
function blkon()
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var tp=10; //тип черный конь
	
	if (search==1)
	{
		i = kor.whI;
		j = kor.whJ;
		ii = kor.figI;
		jj = kor.figJ;
		
		if ((i==ii+1) && ((j==jj+2) || (j==jj-2))) { search=2; return true; }
		if ((i==ii+2) && ((j==jj+1) || (j==jj-1))) { search=2; return true; }
		if ((i==ii-1) && ((j==jj+2) || (j==jj-2))) { search=2; return true; }
		if ((i==ii-2) && ((j==jj+1) || (j==jj-1))) { search=2; return true; }
		else return false;
	}
	else if (search==0)
	{
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false; }
		
		if ((i==ii+1) && ((j==jj+2) || (j==jj-2))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii+2) && ((j==jj+1) || (j==jj-1))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii-1) && ((j==jj+2) || (j==jj-2))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii-2) && ((j==jj+1) || (j==jj-1))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		
		if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false;}
		else return true;	
	}
}
	
//ход белым королем
function whkorol()
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var tp=11;  //тип белый король
	
	if (search==1)
	{
		i = kor.blI;
		j = kor.blJ;
		ii = kor.figI;
		jj = kor.figJ;
		
		if ((i==ii+1) && ((j==jj) || (j==jj+1) || (j==jj-1))) { search=2; return true; }
		if ((i==ii-1) && ((j==jj) || (j==jj+1) || (j==jj-1))) { search=2; return true; }
		if ((i==ii) && ((j==jj+1) || (j==jj-1))) { search=2; return true; }
		else return false;
	}
	else if (search==0)
	{
		if ((i==ii+1) && ((j==jj) || (j==jj+1) || (j==jj-1))) { kor.whI=i; kor.whJ=j; fl=1; if (makeMove(tp)==false) { fl2=0; kor.whI=ii; kor.whJ=jj;} }
		if ((i==ii-1) && ((j==jj) || (j==jj+1) || (j==jj-1))) { kor.whI=i; kor.whJ=j; fl=1; if (makeMove(tp)==false) { fl2=0; kor.whI=ii; kor.whJ=jj;} }
		if ((i==ii) && ((j==jj+1) || (j==jj-1))) { kor.whI=i; kor.whJ=j; fl=1; if (makeMove(tp)==false) { fl2=0; kor.whI=ii; kor.whJ=jj;} }
	}

	if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false;}
	else return true;
}

//ход черным королем
function blkorol()
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var tp=12;  //тип черный король
	
	if (search==1)
	{
		i = kor.whI;
		j = kor.whJ;
		ii = kor.figI;
		jj = kor.figJ;
		
		if ((i==ii+1) && ((j==jj) || (j==jj+1) || (j==jj-1))) { search=2; return true; }
		if ((i==ii-1) && ((j==jj) || (j==jj+1) || (j==jj-1))) { search=2; return true; }
		if ((i==ii) && ((j==jj+1) || (j==jj-1))) { search=2; return true; }
		else return false;
	}
	else if (search==0)
	{
		if ((i==ii+1) && ((j==jj) || (j==jj+1) || (j==jj-1))) { kor.blI=i; kor.blJ=j; fl=1; if (makeMove(tp)==false) { fl2=0; kor.blI=ii; kor.blJ=jj;} }
		if ((i==ii-1) && ((j==jj) || (j==jj+1) || (j==jj-1))) { kor.blI=i; kor.blJ=j; fl=1; if (makeMove(tp)==false) { fl2=0; kor.blI=ii; kor.blJ=jj;} }
		if ((i==ii) && ((j==jj+1) || (j==jj-1))) { kor.blI=i; kor.blJ=j; fl=1; if (makeMove(tp)==false) { fl2=0; kor.blI=ii; kor.blJ=jj;} }
	}
	
	if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("Ход невозможен!!!"); clear(); return false;}
	else return true;
}

//есть ли шах 
function chah()  
{
var ch=0;

	for (var i=0; i < 8; i++) 
	{
		for (var j=0; j < 8; j++)
		{
			if (turn==1)
			{
				if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("name") == "white") && ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") != "free"))
				{
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") { search=1; kor.figI=i; kor.figJ=j; whpeshka(); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") { search=1; kor.figI=i; kor.figJ=j; whferz(); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon") { search=1; kor.figI=i; kor.figJ=j; whslon(0); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya") { search=1; kor.figI=i; kor.figJ=j; whladya(0); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon") { search=1; kor.figI=i; kor.figJ=j; whkon(); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { search=1; kor.figI=i; kor.figJ=j; whkorol(); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
				}
			}
			else if (turn==0)
			{
				if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("name") == "black") && ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") != "free"))
				{
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") { search=1; kor.figI=i; kor.figJ=j; blpeshka(); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") { search=1; kor.figI=i; kor.figJ=j; blferz(); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon") { search=1; kor.figI=i; kor.figJ=j; blslon(0); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya") { search=1; kor.figI=i; kor.figJ=j; blladya(0); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon") { search=1; kor.figI=i; kor.figJ=j; blkon(); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { search=1; kor.figI=i; kor.figJ=j; blkorol(); if (search==2) { kor.I=i; kor.J=j; ch++; } search=0; }
				}
			}
		}
	}
	korkol=ch; 
	if (ch==0) return false; else return true;
}

//есть ли куда ходить королю
function hodkor() 
{
	var i = 0; var j = 0; 

	var fl1=0;  //есть ли самому королю куда сходить
	var fl2=0; // да еще и с повторным шахом если
	
	if (turn==1) 
	{ 
		i=kor.blI; j=kor.blJ; 
		var ii=i+1; var jj=j; if ((ii<8)&&(ii>-1)) {if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "black")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		ii=i+1; jj=j-1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "black")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		ii=i+1; jj=j+1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "black")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		
		ii=i; jj=j-1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "black")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		ii=i; jj=j+1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "black")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		
		ii=i-1; jj=j; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "black")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		ii=i-1; jj=j-1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "black")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		ii=i-1; jj=j+1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "black")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
	}
	else if (turn==0) 
	{ 
		i=kor.whI; j=kor.whJ;
		var ii=i+1; var jj=j; if ((ii<8)&&(ii>-1)) {if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "white")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		ii=i+1; jj=j-1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "white")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		ii=i+1; jj=j+1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "white")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		
		ii=i; jj=j-1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "white")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		ii=i; jj=j+1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "white")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		
		ii=i-1; jj=j; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "white")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		ii=i-1; jj=j-1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "white")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
		ii=i-1; jj=j+1; if (((ii<8)&&(ii>-1)) && ((jj<8)&&(jj>-1))) { if (($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") != "free") & ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("type") == "white")) fl1++; else { if (maybe(ii,jj)==true) fl2++; } }
	}
	
	if ((fl1==8) || (fl2!=0)) return false;  //королю самому некуда сходить от шаха: либо все клетки вокруг заняты, либо все возможные ходы снова вызывают шах
	if ((fl1<8) && (fl2==0)) return false;
	else return true;
}

//будет ли повторный шах после всех возможных ходов короля
function maybe(i,j)
{
	if (turn==1) 
	{ 
		$("tr:eq(" + i + ") > td:eq(" + j + ")").attr("name","white");
		$("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type","korol");
		kor.oldI=kor.blI; kor.oldJ=kor.blJ; kor.blI=i; kor.blJ=j;
		
		if (chah()== true) { kor.blI=kor.oldI; kor.blJ=kor.oldJ; $("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type","free"); return true; }
		else { kor.blI=kor.oldI; kor.blJ=kor.oldJ; $("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type","free"); return false; }
	}
	else if (turn==0)
	{
		$("tr:eq(" + i + ") > td:eq(" + j + ")").attr("name","black");
		$("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type","korol");
		kor.oldI=kor.whI; kor.oldJ=kor.whJ; kor.whI=i; kor.whJ=j;
		
		if (chah()== true) { kor.whI=kor.oldI; kor.whJ=kor.oldJ; $("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type","free"); return true; }
		else { kor.whI=kor.oldI; kor.whJ=kor.oldJ; $("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type","free"); return false; }	
	}
}

//может ли пешка спасти свою команду от шаха
function peashkahelp(k,s)
{
	var i=kor.I; var j=kor.J;
	var ii=k; var jj=s;
	var ki=0; var kj=0;
	var g=0; var t=0; var p=0; var noteat=0;
	
	if (turn==1) { ki=kor.blI; kj=kor.blJ; }
	if (turn==0) { ki=kor.whI; kj=kor.whJ; }
	
	//пешка может помешать фигурам,съев их
	if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya"))
	{
		if (turn==1) { if ((i==ii+1) && ((j==jj+1) || (j==jj-1))) return true; }
		if (turn==0) { if ((i==ii-1) && ((j==jj+1) || (j==jj-1))) return true; }
	}
	
	//пешка может помешать ладье, вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya")
	{
		if ((j>kj) && (i==ki))    // шах и король в одном ряду, но шах правее
		{
			t=i;
			for(g = kj+1; g < j; g++)
			{
				if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
				{
					if (ii==1) { first_in=1; p=ii+1; }
					if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) return true; 
					if ((t==ii+1) && (g==jj)) return true; 
				}
				else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
				{
					if (ii==6) { first_in=1; p=ii+1; }
					if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) return true; 
					if ((t==ii-1) && (g==jj)) return true; 
				}	
			}
		}
				
		if ((j<kj) && (i==ki))    // шах и король в одном ряду, но шах левее
		{
			t=i;
			for(g = kj-1; g < j; g=g-1)
			{
				if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
				{
					if (ii==1) { first_in=1; p=ii+1; }
					if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) return true; 
					if ((t==ii+1) && (g==jj)) return true; 
				}
				else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
				{
					if (ii==6) { first_in=1; p=ii+1; }
					if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) return true; 
					if ((t==ii-1) && (g==jj)) return true; 
				}	
			}
		}
	}
	
	//пешка может помешать слону, вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
	{
		if (i>ki) //низ поля
		{
			if (j>kj)  //вправо
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g<j) g++;
					if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==1) { first_in=1; p=ii+1; }
						if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii+1) && (g==jj)) noteat++; 
					}
					else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==6) { first_in=1; p=ii+1; }
						if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii-1) && (g==jj)) noteat++; 
					}	
				}				
				if (noteat!=0) return true;
			}
			
			if (j<jj)  //влево
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g>j) g=g-1;
					if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==1) { first_in=1; p=ii+1; }
						if ((t==ii+2) && (g==jj) && (first_in==1) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii+1) && (g==jj)) noteat++; 
					}
					else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==6) { first_in=1; p=ii+1; }
						if ((t==ii-2) && (g==jj) && (first_in==1) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii-1) && (g==jj)) noteat++; 
					}	
				}				
				if (noteat!=0) return true;
			}		
		}
		
		if (i<ki) //верх поля
		{
			if (j>kj)  //вправо
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g<j) g++;
				    if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==1) { first_in=1; p=ii+1; }
						if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii+1) && (g==jj)) noteat++; 
					}
					else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==6) { first_in=1; p=ii+1; }
						if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii-1) && (g==jj)) noteat++; 
					}	
				}				
				if (noteat!=0) return true;
			}
			
			if (j<jj)  //влево
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g>j) g=g-1;
					if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==1) { first_in=1; p=ii+1; }
						if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii+1) && (g==jj)) noteat++; 
					}
					else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==6) { first_in=1; p=ii+1; }
						if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii-1) && (g==jj)) noteat++; 
					}	
				}				
				if (noteat!=0) return true;
			}
		}	
	}
	
	//пешка может помешать ферзю, вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz")
	{
		if ((j>kj) && (i==ki))    // шах и король в одном ряду, но шах правее
		{
			t=i;
			for(g = kj+1; g < j; g++)
			{
				if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
				{
					if (ii==1) { first_in=1; p=ii+1; }
					if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) return true; 
					if ((t==ii+1) && (g==jj)) return true; 
				}
				else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
				{
					if (ii==6) { first_in=1; p=ii+1; }
					if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) return true; 
					if ((t==ii-1) && (g==jj)) return true; 
				}	
			}
		}
				
		if ((j<kj) && (i==ki))    // шах и король в одном ряду, но шах левее
		{
			t=i;
			for(g = kj-1; g < j; g=g-1)
			{
				if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
				{
					if (ii==1) { first_in=1; p=ii+1; }
					if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) return true; 
					if ((t==ii+1) && (g==jj)) return true; 
				}
				else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
				{
					if (ii==6) { first_in=1; p=ii+1; }
					if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) return true; 
					if ((t==ii-1) && (g==jj)) return true; 
				}	
			}
		}
		
		if (i>ki) //низ поля
		{
			if (j>kj)  //вправо
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g<j) g++;
					if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==1) { first_in=1; p=ii+1; }
						if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii+1) && (g==jj)) noteat++; 
					}
					else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==6) { first_in=1; p=ii+1; }
						if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii-1) && (g==jj)) noteat++; 
					}	
				}				
				if (noteat!=0) return true;
			}
			
			if (j<jj)  //влево
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g>j) g=g-1;
					if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==1) { first_in=1; p=ii+1; }
						if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii+1) && (g==jj)) noteat++; 
					}
					else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==6) { first_in=1; p=ii+1; }
						if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii-1) && (g==jj)) noteat++; 
					}	
				}				
				if (noteat!=0) return true;
			}		
		}
		
		if (i<ki) //верх поля
		{
			if (j>kj)  //вправо
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g<j) g++;
				    if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==1) { first_in=1; p=ii+1; }
						if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii+1) && (g==jj)) noteat++; 
					}
					else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==6) { first_in=1; p=ii+1; }
						if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii-1) && (g==jj)) noteat++; 
					}	
				}				
				if (noteat!=0) return true;
			}
			
			if (j<jj)  //влево
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g>j) g=g-1;
					if ((turn==1) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==1) { first_in=1; p=ii+1; }
						if ((t==ii+2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii+1) && (g==jj)) noteat++; 
					}
					else if ((turn==0) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") == "free"))
					{
						if (ii==6) { first_in=1; p=ii+1; }
						if ((t==ii-2) && (g==jj) && (first_in==1) && ($("tr:eq(" + p + ") > td:eq(" + g + ")").attr("type") == "free")) noteat++;
						if ((t==ii-1) && (g==jj)) noteat++; 
					}	
				}				
				if (noteat!=0) return true;
			}
		}	
	}

	return false;
}

//может ли ладья спасти свою команду от шаха
function ladyahelp(k,s)
{
	var i=kor.I; var j=kor.J;
	var ii=k; var jj=s;
	var ki=0; var kj=0;
	var g=0; var t=0; var x=0; var y=0; var noteat=0;
	
	if (turn==1) { ki=kor.blI; kj=kor.blJ; }
	if (turn==0) { ki=kor.whI; kj=kor.whJ; }
	
	//ладья может помешать фигуре,съев её 
	if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya") && ((i==ii) || (j==jj)))
	{ 
		if (i==ii)
		{
			if ((j==jj+1) || (j==jj-1)) return true; 
				
			if (j>jj) //один ряд,шахованная справа
			{
				for(g = jj+1; g < j; g++)
				{
					if ($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
				}
				if (noteat==0) return true;
			}
				
			if (j<jj)
			{
				for(g = g-1; g > j; g=g-1) //один ряд,шахованная слева
				{
					if ($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
				}
				if (noteat==0) return true;
			}
		}
		else if (j==jj)
		{
			if ((i==ii+1) || (i==ii-1)) return true;
				
			if (i>ii)  //один столбец,шахованная ниже
			{
				for(t = ii+1; t < i; t++)
				{
					if ($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
				}
				if (noteat==0) return true;
			}
				
			if (i<ii)  //один столбец,шахованная выше
			{
				for(k = i+1; k < ii; k++)
				{
					if ($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
				}
				if (noteat==0) return true;
			}
		}
	}
	
	//ладья может помешать ладье,вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya")
	{
		if (i==ki)
		{
			if (j>kj)  //один ряд,шахованная справа
			{
				for (g=kj+1; g<j; g++)
				{
					if ((jj==g) && (ii<i))  //спасающая справа сверху
					{
						noteat=1;
						for (t=ii+1; t<i; t++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((jj==g) && (ii>i))  //спасающая справа внизу
					{
						noteat=1;
						for (t=ii-1; t>i; t=t-1)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					if (noteat==1) return true;
				}
			}
			
			if (j<kj)  //один ряд,шахованная слева
			{
				for (g=kj-1; g>j; g=g-1)
				{
					if ((jj==g) && (ii<i))  //спасающая справа сверху
					{
						noteat=1;
						for (t=ii+1; t<i; t++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((jj==g) && (ii>i))  //спасающая справа внизу
					{
						noteat=1;
						for (t=ii-1; t>i; t=t-1)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					if (noteat==1) return true;
				}
			}
		}
		else if (j==kj)
		{
			if (i>ki)  //один стобец, шахованная ниже
			{
				for (t=ki+1; t<i; t++)
				{
					if ((ii=t) && (jj>j))  //спасающая справа
					{
						noteat=1;
						for (g=j+1; g<jj; g++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((ii=t) && (jj>j))  //спасающая слева 
					{
						noteat=1;
						for (g=j-1; g>jj; g=g-1)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					if (noteat==1) return true;
				}
			}
			
			if (i<ki)  //один стобец, шахованная выше
			{
				for (t=ki-1; t>i; t=t-1)
				{
					if ((ii=t) && (jj>j))  //спасающая справа
					{
						noteat=1;
						for (g=j+1; g<jj; g++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((ii=t) && (jj>j))  //спасающая слева 
					{
						noteat=1;
						for (g=j-1; g>jj; g=g-1)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					if (noteat==1) return true;
				}
			}
		}
	}
		
	//ладья может помешать слону,вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
	{
		if (i>ki)  //низ поля
		{
			if (j>kj)  //шахованная справа
			{
				g=kj;
				for (t=ki+1;t>i;t++)
				{
					if (g<j) g++;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //спасающая справа 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //спасающая слева 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //спасающая внизу
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //спасающая наверху
						for (x=t-1; x>ii; x=x-1)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (noteat==1) return true;
					}
				}
			}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////									
						
			if (j<kj)  //шахованная слева
			{
				g=kj;
				for (t=ki+1;t>i;t++)
				{
					if (g>j) g=g-1;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //спасающая справа 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //спасающая слева 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //спасающая внизу
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //спасающая наверху
						for (x=t-1; x>ii; x=x-1)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (noteat==1) return true;
					}
				}
			}
		}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		
		if (i<ki)  //верх поля
		{
			if (j>kj)  //шахованная справа
			{
				g=kj;
				for (t=ki-1;t<i;t=t-1)
				{
					if (g<j) g++;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //спасающая справа 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //спасающая слева 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //спасающая внизу
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //спасающая наверху
						for (x=t-1; x>ii; x=x-1)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (noteat==1) return true;
					}
				}
			}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////									
						
			if (j<kj)  //шахованная слева
			{
				g=kj;
				for (t=ki-1;t<i;t=t-1)
				{
					if (g>j) g=g-1;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //спасающая справа 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //спасающая слева 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //спасающая внизу
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //спасающая наверху
						for (x=t-1; x>ii; x=x-1)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (noteat==1) return true;
					}
				}
			}
		}
	}
	
	//ладья может помешать ферзю,вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz")
	{
		if (i==ki)
		{
			if (j>kj)  //один ряд,шахованная справа
			{
				for (g=kj+1; g<j; g++)
				{
					if ((jj==g) && (ii<i))  //спасающая справа сверху
					{
						noteat=1;
						for (t=ii+1; t<i; t++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((jj==g) && (ii>i))  //спасающая справа внизу
					{
						noteat=1;
						for (t=ii-1; t>i; t=t-1)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					if (noteat==1) return true;
				}
			}
			
			if (j<kj)  //один ряд,шахованная слева
			{
				for (g=kj-1; g>j; g=g-1)
				{
					if ((jj==g) && (ii<i))  //спасающая справа сверху
					{
						noteat=1;
						for (t=ii+1; t<i; t++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((jj==g) && (ii>i))  //спасающая справа внизу
					{
						noteat=1;
						for (t=ii-1; t>i; t=t-1)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					if (noteat==1) return true;
				}
			}
		}
		else if (j==kj)
		{
			if (i>ki)  //один стобец, шахованная ниже
			{
				for (t=ki+1; t<i; t++)
				{
					if ((ii=t) && (jj>j))  //спасающая справа
					{
						noteat=1;
						for (g=j+1; g<jj; g++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((ii=t) && (jj>j))  //спасающая слева 
					{
						noteat=1;
						for (g=j-1; g>jj; g=g-1)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					if (noteat==1) return true;
				}
			}
			
			if (i<ki)  //один стобец, шахованная выше
			{
				for (t=ki-1; t>i; t=t-1)
				{
					if ((ii=t) && (jj>j))  //спасающая справа
					{
						noteat=1;
						for (g=j+1; g<jj; g++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((ii=t) && (jj>j))  //спасающая слева 
					{
						noteat=1;
						for (g=j-1; g>jj; g=g-1)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					if (noteat==1) return true;
				}
			}
		}
		
		else if (i>ki)  //низ поля
		{
			if (j>kj)  //шахованная справа
			{
				g=kj;
				for (t=ki+1;t>i;t++)
				{
					if (g<j) g++;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //спасающая справа 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //спасающая слева 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //спасающая внизу
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //спасающая наверху
						for (x=t-1; x>ii; x=x-1)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (noteat==1) return true;
					}
				}
			}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////									
						
			if (j<kj)  //шахованная слева
			{
				g=kj;
				for (t=ki+1;t>i;t++)
				{
					if (g>j) g=g-1;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //спасающая справа 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //спасающая слева 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //спасающая внизу
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //спасающая наверху
						for (x=t-1; x>ii; x=x-1)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (noteat==1) return true;
					}
				}
			}
		}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		
		else if (i<ki)  //верх поля
		{
			if (j>kj)  //шахованная справа
			{
				g=kj;
				for (t=ki-1;t<i;t=t-1)
				{
					if (g<j) g++;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //спасающая справа 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //спасающая слева 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //спасающая внизу
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //спасающая наверху
						for (x=t-1; x>ii; x=x-1)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (noteat==1) return true;
					}
				}
			}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////									
						
			if (j<kj)  //шахованная слева
			{
				g=kj;
				for (t=ki-1;t<i;t=t-1)
				{
					if (g>j) g=g-1;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //спасающая справа 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //спасающая слева 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //спасающая внизу
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //спасающая наверху
						for (x=t-1; x>ii; x=x-1)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (noteat==1) return true;
					}
				}
			}
		}
	}	
	return false;
}

//может ли слон спасти свою команду от шаха
function slonhelp(k,s)
{
	var i=kor.I; var j=kor.J;
	var ii=k; var jj=s;
	var ki=0; var kj=0;
	var g=0; var t=0; var x=0; var y=0; var fl=0; var fl2=0; var noteat=0;
	
	if (turn==1) { ki=kor.blI; kj=kor.blJ; }
	if (turn==0) { ki=kor.whI; kj=kor.whJ; }
	
	//слон может помешать фигуре,съев её 
	if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya") && ((i!=ii) && (j!=jj))
		&& ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
	{ 
	
		if (((i==ii+1) || (i==ii-1)) && ((j==jj-1) || (j==jj+1))) return true; 
		if (i>ii) //низ поля
		{
			if (j>jj)  //шахованная справа
			{
				g=jj;
				for (t=ii+1;t<=i;t++)
				{
					if (g<=j) g++;
					if ((t==i) && (g==j) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free")) { fl2=2; break; }
					if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
				}				
				if ((noteat==0) && (fl2==2)) return true;
			}
			
			if (j<jj)  //шахованная слева
			{
				g=jj;
				for (t=ii+1; t<=i; t++)
				{
					if (g>=j) g=g-1;
					if ((t==i) && (g==j) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free")) { fl2=2; break; }
					if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
				}
				if ((noteat==0) && (fl2==2)) return true;
			}		
		}
		
		if (i<ii)  //верх поля
		{
			if (j>jj)  //шахованная справа
			{
				g=jj;
				for (t=ii-1;t>=i;t=t-1)
				{
					if (g<=j) g++;
					if ((t==i) && (g==j) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free")) { fl2=2; break; }
					if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
				}				
				if ((noteat==0) && (fl2==2)) return true;
			}
			
			if (j<jj)  //шахованная слева
			{
				g=jj;
				for (t=ii-1;t>=i;t=t-1)
				{
					if (g>=j) g=g-1;
					if ((t==i) && (g==j) && ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free")) { fl2=2; break; }
					if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
				}				
				if ((noteat==0) && (fl2==2)) return true;
			}
		}
	}
	
	//слон может помешать ладье,вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya")
	{
		if (i==ki)
		{
			if (j>kj)  //один ряд,шахованная справа
			{
				for (g=kj+1; g<j; g++)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>i) //низ поля
						{
							if (jj>g)  //спасающая справа
							{
								y=g;
								for (x=i+1;x<=ii;x++)
								{
									if (y<=jj) y++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (jj<g)  //спасающая слева
							{
								y=g;
								for (x=i+1; x<=ii; x++)
								{
									if (y>=jj) y=y-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}
								if ((noteat==0) && (fl==1)) return true;
							}		
						}
						
						if (i<ii)  //верх поля
						{
							if (j>jj)  //спасающая справа
							{
								y=g;
								for (x=i-1;x>=ii;x=x-1)
								{
									if (y<=jj) y++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (j<jj)  //спасающая слева
							{
								y=g;
								for (x=i-1;x>=ii;x=x-1)
								{
									if (y>=jj) y=y-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////										
			if (j<kj)  //один ряд,шахованная слева
			{
				for (g=kj-1; g>j; g=g-1)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>i) //низ поля
						{
							if (jj>g)  //спасающая справа
							{
								y=g;
								for (x=i+1;x<=ii;x++)
								{
									if (y<=jj) y++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (jj<g)  //спасающая слева
							{
								y=g;
								for (x=i+1; x<=ii; x++)
								{
									if (y>=jj) y=y-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}
								if ((noteat==0) && (fl==1)) return true;
							}		
						}
						
						if (i<ii)  //верх поля
						{
							if (j>jj)  //спасающая справа
							{
								y=g;
								for (x=i-1;x>=ii;x=x-1)
								{
									if (y<=jj) y++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (j<jj)  //спасающая справа
							{
								y=g;
								for (x=i-1;x>=ii;x=x-1)
								{
									if (y>=jj) y=y-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
		}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		else if (j==kj)
		{
			if (i>ki)  //один стобец, шахованная ниже
			{
				for (t=ki+1; t<i; t++)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					if (($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>t) //низ поля
						{
							if (jj>j)  //спасающая справа
							{
								x=t;
								for (y=j+1;y<=jj;y++)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (jj<j)  //спасающая слева
							{
								x=t;
								for (y=j-1; y>=jj; y=y-1)
								{
									if (x<=ii) x++;
									if ((y==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}
								if ((noteat==0) && (fl==1)) return true;
							}		
						}
						
						if (ii<t)  //верх поля
						{
							if (jj>j)  //спасающая справа
							{
								x=t;
								for (y=j+1;y<=jj;y++)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (j<jj)  //спасающая справа
							{
								x=t;
								for (y=j-1; y>=jj; y=y-1)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////						
			if (i<ki)  //один стобец, шахованная выше
			{
				for (t=ki-1; t>i; t=t-1)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>t) //низ поля
						{
							if (jj>j)  //спасающая справа
							{
								x=t;
								for (y=j+1;y<=jj;y++)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (jj<j)  //спасающая слева
							{
								x=t;
								for (y=j-1; y>=jj; y=y-1)
								{
									if (x<=ii) x++;
									if ((y==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}
								if ((noteat==0) && (fl==1)) return true;
							}		
						}
						
						if (ii<t)  //верх поля
						{
							if (jj>j)  //спасающая справа
							{
								x=t;
								for (y=j+1;y<=jj;y++)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (j<jj)  //спасающая справа
							{
								x=t;
								for (y=j-1; y>=jj; y=y-1)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
		}
	}
			
	//слон может помешать слону,вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
	{
		if (i>ki) //низ поля
		{
			if (j>kj)  //шахованная справа
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g<j) g++;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj<g)) // спасающая слева внизу 
							{
								x=t;
								for(y=g-1;y>=jj;y=y-1)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if ((ii<t) && (jj>g)) // спасающая справа наверху 
							{
								x=t;
								for(y=g+1;y<=jj;y++)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
			
			if (j<kj)  //шахованная слева
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g>j) g=g-1;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj>g)) // спасающая справа внизу 
							{
								x=t;
								for(y=g+1;y<=jj;y++)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if ((ii<t) && (jj>g)) // спасающая слева наверху 
							{
								x=t;
								for(y=g-1;y>=jj;y=y-1)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
		}
			
		if (i<ki) //верх поля
		{
			if (j>kj)  //шахованная справа
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g<j) g++;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj>g)) // спасающая справа внизу 
							{
								x=t;
								for(y=g+1;y<=jj;y++)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if ((ii<t) && (jj>g)) // спасающая слева наверху 
							{
								x=t;
								for(y=g-1;y>=jj;y=y-1)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
						
					}
				}
			}
			
			if (j<kj)  //шахованная справа
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g>j) g=g-1;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj<g)) // спасающая слева внизу 
							{
								x=t;
								for(y=g-1;y>=jj;y=y-1)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if ((ii<t) && (jj>g)) // спасающая справа наверху 
							{
								x=t;
								for(y=g+1;y<=jj;y++)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
		}
	}
	
	//слон может помешать ферзю,вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
	{
		if (i==ki)
		{
			if (j>kj)  //один ряд,шахованная справа
			{
				for (g=kj+1; g<j; g++)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>i) //низ поля
						{
							if (jj>g)  //спасающая справа
							{
								y=g;
								for (x=i+1;x<=ii;x++)
								{
									if (y<=jj) y++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (jj<g)  //спасающая слева
							{
								y=g;
								for (x=i+1; x<=ii; x++)
								{
									if (y>=jj) y=y-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}
								if ((noteat==0) && (fl==1)) return true;
							}		
						}
						
						if (i<ii)  //верх поля
						{
							if (j>jj)  //спасающая справа
							{
								y=g;
								for (x=i-1;x>=ii;x=x-1)
								{
									if (y<=jj) y++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (j<jj)  //спасающая слева
							{
								y=g;
								for (x=i-1;x>=ii;x=x-1)
								{
									if (y>=jj) y=y-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////										
			if (j<kj)  //один ряд,шахованная слева
			{
				for (g=kj-1; g>j; g=g-1)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>i) //низ поля
						{
							if (jj>g)  //спасающая справа
							{
								y=g;
								for (x=i+1;x<=ii;x++)
								{
									if (y<=jj) y++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (jj<g)  //спасающая слева
							{
								y=g;
								for (x=i+1; x<=ii; x++)
								{
									if (y>=jj) y=y-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}
								if ((noteat==0) && (fl==1)) return true;
							}		
						}
						
						if (i<ii)  //верх поля
						{
							if (j>jj)  //спасающая справа
							{
								y=g;
								for (x=i-1;x>=ii;x=x-1)
								{
									if (y<=jj) y++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (j<jj)  //спасающая справа
							{
								y=g;
								for (x=i-1;x>=ii;x=x-1)
								{
									if (y>=jj) y=y-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
		}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		else if (j==kj)
		{
			if (i>ki)  //один стобец, шахованная ниже
			{
				for (t=ki+1; t<i; t++)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					if (($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>t) //низ поля
						{
							if (jj>j)  //спасающая справа
							{
								x=t;
								for (y=j+1;y<=jj;y++)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (jj<j)  //спасающая слева
							{
								x=t;
								for (y=j-1; y>=jj; y=y-1)
								{
									if (x<=ii) x++;
									if ((y==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}
								if ((noteat==0) && (fl==1)) return true;
							}		
						}
						
						if (ii<t)  //верх поля
						{
							if (jj>j)  //спасающая справа
							{
								x=t;
								for (y=j+1;y<=jj;y++)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (j<jj)  //спасающая справа
							{
								x=t;
								for (y=j-1; y>=jj; y=y-1)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////						
			if (i<ki)  //один стобец, шахованная выше
			{
				for (t=ki-1; t>i; t=t-1)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>t) //низ поля
						{
							if (jj>j)  //спасающая справа
							{
								x=t;
								for (y=j+1;y<=jj;y++)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (jj<j)  //спасающая слева
							{
								x=t;
								for (y=j-1; y>=jj; y=y-1)
								{
									if (x<=ii) x++;
									if ((y==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}
								if ((noteat==0) && (fl==1)) return true;
							}		
						}
						
						if (ii<t)  //верх поля
						{
							if (jj>j)  //спасающая справа
							{
								x=t;
								for (y=j+1;y<=jj;y++)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if (j<jj)  //спасающая справа
							{
								x=t;
								for (y=j-1; y>=jj; y=y-1)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
		}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		if (i>ki) //низ поля
		{
			if (j>kj)  //шахованная справа
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g<j) g++;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj<g)) // спасающая слева внизу 
							{
								x=t;
								for(y=g-1;y>=jj;y=y-1)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if ((ii<t) && (jj>g)) // спасающая справа наверху 
							{
								x=t;
								for(y=g+1;y<=jj;y++)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
			
			if (j<kj)  //шахованная слева
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g>j) g=g-1;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj>g)) // спасающая справа внизу 
							{
								x=t;
								for(y=g+1;y<=jj;y++)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if ((ii<t) && (jj>g)) // спасающая слева наверху 
							{
								x=t;
								for(y=g-1;y>=jj;y=y-1)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
		}
			
		if (i<ki) //верх поля
		{
			if (j>kj)  //шахованная справа
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g<j) g++;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj>g)) // спасающая справа внизу 
							{
								x=t;
								for(y=g+1;y<=jj;y++)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if ((ii<t) && (jj>g)) // спасающая слева наверху 
							{
								x=t;
								for(y=g-1;y>=jj;y=y-1)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
						
					}
				}
			}
			
			if (j<kj)  //шахованная справа
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g>j) g=g-1;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj<g)) // спасающая слева внизу 
							{
								x=t;
								for(y=g-1;y>=jj;y=y-1)
								{
									if (x<=ii) x++;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
							
							if ((ii<t) && (jj>g)) // спасающая справа наверху 
							{
								x=t;
								for(y=g+1;y<=jj;y++)
								{
									if (x>=ii) x=x-1;
									if ((x==ii) && (y==jj) && ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") == "slon")) { fl=1; break; }
									if ($("tr:eq(" + x + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
								}				
								if ((noteat==0) && (fl==1)) return true;
							}
						}
					}
				}
			}
		}
	}
	
	return false;	
}

//может ли ферзь спасти свою команду от шаха
function ferzhelp(k,s)
{
	var i=k; var j=s;
	if (((ladyahelp(i,j)) != true) || ((slonhelp(i,j)) != true)) return false;
	else return true;
}

//может ли конь спасти свою команду от шаха
function konhelp(k,s)
{
	var i=kor.I; var j=kor.J;
	var ii=k; var jj=s;
	var ki=0; var kj=0;
	var g=0; var t=0; var p=0;
	
	if (turn==1) { ki=kor.blI; kj=kor.blJ; }
	if (turn==0) { ki=kor.whI; kj=kor.whJ; }
	
	//конь может помешать фигурам,съев их
	if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya"))
	{
		if ((i==ii+1) && ((j==jj+2) || (j==jj-2))) return true;
		if ((i==ii+2) && ((j==jj+1) || (j==jj-1))) return true; 
		if ((i==ii-1) && ((j==jj+2) || (j==jj-2))) return true; 
		if ((i==ii-2) && ((j==jj+1) || (j==jj-1))) return true; 
	}
	
	//конь может помешать ладье, вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya")
	{
		if ((j>kj) && (i==ki))    // шах и король в одном ряду, но шах правее
		{
			t=i;
			for(g = kj+1; g < j; g++)
			{
				if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
				if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
				if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
				if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
			}
		}
				
		if ((j<kj) && (i==ki))    // шах и король в одном ряду, но шах левее
		{
			t=i;
			for(g = kj-1; g < j; g=g-1)
			{	if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
				if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
				if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
				if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
			}
		}
		
		if ((i>ki) && (j==kj))    // шах и король в одном столбце, но шах ниже
		{
			g=kj;
			for(t = ki+1; t < i; t++)
			{
				if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
				if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
				if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
				if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
			}
		}
		
		if ((i>ki) && (j==kj))    // шах и король в одном столбце, но шах выше
		{
			g=kj;
			for(t = ki-1; t > i; t=t-1)
			{
				if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
				if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
				if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
				if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
			}
		}
	}
	
	//конь может помешать слону, вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
	{
		if (i>ki) //низ поля
		{
			if (j>kj)  //вправо
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g<j) g++;
					if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
					if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
					if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
					if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
				}				
			}
			
			if (j<jj)  //влево
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g>j) g=g-1;
					if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
					if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
					if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
					if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true;  
				}				
			}		
		}
		
		if (i<ki) //верх поля
		{
			if (j>kj)  //вправо
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g<j) g++;
				    if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
					if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
					if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
					if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
				}				
			}
			
			if (j<jj)  //влево
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g>j) g=g-1;
					if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
					if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
					if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
					if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true;  
				}				
			}
		}	
	}
	
	//конь может помешать ферзю, вклинившись между ними
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz")
	{
		if ((j>kj) && (i==ki))    // шах и король в одном ряду, но шах правее
		{
			t=i;
			for(g = kj+1; g < j; g++)
			{
				if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
				if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
				if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
				if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
			}
		}
				
		if ((j<kj) && (i==ki))    // шах и король в одном ряду, но шах левее
		{
			t=i;
			for(g = kj-1; g < j; g=g-1)
			{	if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
				if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
				if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
				if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
			}
		}
		
		if ((i>ki) && (j==kj))    // шах и король в одном столбце, но шах ниже
		{
			g=kj;
			for(t = ki+1; t < i; t++)
			{
				if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
				if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
				if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
				if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
			}
		}
		
		if ((i>ki) && (j==kj))    // шах и король в одном столбце, но шах выше
		{
			g=kj;
			for(t = ki-1; t > i; t=t-1)
			{
				if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
				if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
				if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
				if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
			}
		}
	
		if (i>ki) //низ поля
		{
			if (j>kj)  //вправо
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g<j) g++;
					if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
					if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
					if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
					if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
				}				
			}
			
			if (j<jj)  //влево
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g>j) g=g-1;
					if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
					if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
					if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
					if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true;  
				}				
			}		
		}
		
		if (i<ki) //верх поля
		{
			if (j>kj)  //вправо
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g<j) g++;
				    if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
					if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
					if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
					if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
				}				
			}
			
			if (j<jj)  //влево
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g>j) g=g-1;
					if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
					if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
					if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
					if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true;  
				}				
			}
		}	
	}

	return false;
}

//может ли своя фигура съесть шах или преградить ему путь
function caneat()
{
	var ch=0;
	
	for (var i=0; i < 8; i++) 
	{
		for (var j=0; j < 8; j++)
		{
			if (turn==1)
			{
				if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("name") == "black") && ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") != "free"))
				{
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") { if (peashkahelp(i,j) == true) return true; else ch++; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya") { if (ladyahelp(i,j) == true) return true; else ch++; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon") { if (slonhelp(i,j) == true) return true; else ch++; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") { if (ferzhelp(i,j) == true) return true; else ch++; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon") { if (konhelp(i,j) == true) return true; else ch++; }
				}
			}
			else if (turn==0)
			{
				if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("name") == "white") && ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") != "free"))
				{
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") { if (peashkahelp(i,j) == true) return true; else ch++; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya") { if (ladyahelp(i,j) == true) return true; else ch++; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon") { if (slonhelp(i,j) == true) return true; else ch++; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") { if (ferzhelp(i,j) == true) return true; else ch++; }
					if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon") { if (konhelp(i,j) == true) return true; else ch++; }					
				}
			}
		}
	}
	
	if (ch!=0) return false;  //никто не может спасти короля
}

//общая проверка на шах и мат
function check()
{
	if (chah()== false) return false;   //шаха нету-играем дальше
	else if ((korkol==1) && ((hodkor()== true) || (caneat()==true))) { alert("Шах!"); return false;}	 // король может сам уйти от шаха или его могут защитить
	if ((hodkor()== false) && (korkol>1)) return true;  //шах и мат
	if ((hodkor()== false) && (caneat()==false)) return true; //шах и мат
}









