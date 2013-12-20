var socket;

//���� �� ������
function push(el)
{
	if ((piece.posI == -1) && (change==0)) //���� ����� ���  �� ������� � �� ���� ������ �����
	{
		if ((turn==0) && (color==0)) //���� ��� �������
		{
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "ladya")) paint(el);
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "kon")) paint(el);
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "slon")) paint(el);
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "korol")) paint(el);
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "ferz")) paint(el);
			if (($(el).attr("name") == "black") && ($(el).attr("type") == "peshka")) paint(el);
		}
			
		else if ((turn==1) && (color==1)) //���� ��� ������
		{
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "ladya")) paint(el);
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "kon")) paint(el);
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "slon")) paint(el);
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "korol")) paint(el);
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "ferz")) paint(el);
			if (($(el).attr("name") == "white") && ($(el).attr("type") == "peshka")) paint(el);
		}
	}

	else if ((piece.posI != -1) && (change==0)) //���� ��� ���� ��������� ����� � �� ���� ������ �����
		{
			piece.wantI = $(el).parent().parent().children().index($(el).parent());
			piece.wantJ = $(el).parent().children().index($(el));
			
			if ((turn==0) && (color==0)) //��� ������
			{
				if (($(el).attr("name") == "black") && ($(el).attr("type") != "free")) paint(el); 
				else { BlackTryGo();  } //clear();
			}
			else if ((turn==1) && (color==1))//��� �����
			{	
				if (($(el).attr("name") == "white") && ($(el).attr("type") != "free")) paint(el);
				else { WhiteTryGo(); }	//clear();
			}
		}
		
	else if ((change==1) && (turn==0) && (color==0))	//����� ������ ����� � ����� ����
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border","4px solid orange");
		if (($(el).attr("type") == "ladya") || ($(el).attr("type") == "kon") || ($(el).attr("type") == "slon") ||($(el).attr("type") == "ferz"))
		{
			piece.wantI = $(el).parent().parent().children().index($(el).parent());
			piece.wantJ = $(el).parent().children().index($(el));
			if (BlackTryChange(el)== false) { alert("����� ����������!!!"); clear(); }	
		}
		else 
		{
			alert("����� ����������!!!"); clear();
		}
	}
	else if ((change==1) && (turn==1) && (color==1))	 //����� ����� ����� � ����� ����
	{
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border","4px solid orange");
		if (($(el).attr("type") == "ladya") || ($(el).attr("type") == "kon") || ($(el).attr("type") == "slon") ||($(el).attr("type") == "ferz"))
		{
			piece.wantI = $(el).parent().parent().children().index($(el).parent());
			piece.wantJ = $(el).parent().children().index($(el));
			if (WhiteTryChange(el)== false) { alert("����� ����������!!!"); clear(); }	
		}
		else 
		{
			alert("����� ����������!!!"); clear();
		}
	}	
}

//��������� ������
function paint(ch) 
{
	if (piece.posI == -1) //�� ���� ������ �� ��������
	{			
		piece.posI = $(ch).parent().parent().children().index($(ch).parent());
		piece.posJ = $(ch).parent().children().index($(ch));
		$("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border","4px solid orange");
	}
	
	else
	{
		if (($(ch).parent().children().index($(ch)) == piece.posJ) && ($(ch).parent().parent().children().index($(ch).parent()) == piece.posI)) //������� �����
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

//������� ����� ����
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

//��� ������ �����
function BlackTryGo()
{
	if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "peshka")) blpeshka();
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "ladya")) blladya(4);
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "kon")) blkon();
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "slon")) blslon(6);
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "ferz")) blferz(8);
	else if (($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("name") == "black") && ($("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").attr("type") == "korol")) blkorol();
}

//��� ����� �����
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
	piece.posJ=xfrom; //������� ������� I
	piece.posI=yfrom; //������� ������� J
	piece.wantJ=xto; //�������� ������� (��� �� �������) J
	piece.wantI=yto; //�������� ������� (��� �� �������) I
	//newfigure=undefined;
	
	if ((turn==0) && (color==1)) BlackTryGo(); //�� ������, � ����� �����
	if ((turn==1) && (color==0)) WhiteTryGo(); //�� �����, � ����� ������
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

// ���� ��� ���� ��������� + �������� �� ��� � ���
function makeMove(type) 
{
	var choice=type;
	
	if (choice==1) { if (change1()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ����� ����������!");   socket.emit("gameOver"); } } 
	if (choice==2) { if (change2()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ������ ����������!");  socket.emit("gameOver"); } } 
	if (choice==3) { if (change3()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ������ ����������!");  socket.emit("gameOver"); } } 
	if (choice==4) { if (change4()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ����� ����������!");   socket.emit("gameOver"); } } 
	if (choice==5) { if (change5()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ������ ����������!");  socket.emit("gameOver"); } } 
	if (choice==6) { if (change6()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ����� ����������!");   socket.emit("gameOver"); } } 
	if (choice==7) { if (change7()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ������ ����������!");  socket.emit("gameOver"); } } 
	if (choice==8) { if (change8()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ����� ����������!");   socket.emit("gameOver"); } } 
	if (choice==9) { if (change9()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ������ ����������!");  socket.emit("gameOver"); } } 
	if (choice==10) { if (change10()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ����� ����������!"); socket.emit("gameOver"); } } 
	if (choice==11) { if (change11()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ������ ����������!");socket.emit("gameOver"); } } 
	if (choice==12) { if (change12()== false) return false; if (check()== false) tturn(); else { alert("��� � ���! ����� ����������!"); socket.emit("gameOver"); } } 
}

//������ �� ������ �����
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

//������ �� ����� �����
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

//������ �� ����� �����
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

//������ �� ������ �����
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

//������ �� ������ �����
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

//������ �� ������� �����
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

//������ �� ������ �����
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

//������ �� ������� �����
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

//������ �� ������ ����
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

//������ �� ������� ����
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

//������ �� ������ ������
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

//������ �� ������� ������
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

// ��� ������ ������
function blpeshka() 
{
	var first_in=0;
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0;
	var caneat=0;
	var tp=1; //��� ������ �����
	
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
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		
		if (ii==1) first_in=1;
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") != "free") caneat=1; //������ � ��������� ������ ����� ������, ����� ������ ���� 
		
		if ((i==ii+2) && (j==jj) && (first_in==1) && (caneat==0)) { fl=1; if (makeMove(tp)==false) fl=0; return true; } //������ ��� ����� ����� ������
		if ((i==ii+1) && (j==jj) && (caneat==0)) { fl=1; if (makeMove(tp)==false) fl=0; } //������� ��� �����
		if ((i==ii+1) && ((j==jj+1) || (j==jj-1)) && (caneat==1)) { fl=1; if (makeMove(tp)==false) fl=0; }
		
		if ((i==7) && (fl==1)) //���� ����� �� ����� ����
		{
			change=1;
			piece.posI=i;
			piece.posJ=j;
			clear();
			turn=0;
			alert("��� ����� ����� ���������� �������� ������, �� ������� ������� �� ��������");
		}
		
		if (fl==0) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear();} 
	}
}

// ��� ����� ������
function whpeshka() 
{
	var first_in=0;
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0;
	var caneat=0;
	var tp=2; //��� ����� �����
	
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
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		
		if (ii==6) first_in=1;
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") != "free") caneat=1;	//������ � ��������� ������ ����� ������, ����� ������ ���� 
		
		if ((i==ii-2) && (j==jj) && (first_in==1) && (caneat==0)) { fl=1; if (makeMove(tp)==false) fl=0;  return true; } //������ ��� ����� ����� ������
		if ((i==ii-1) && (j==jj) && (caneat==0)) { fl=1; if (makeMove(tp)==false) fl=0;  } //������� ��� �����
		if ((i==ii-1) && ((j==jj+1) || (j==jj-1)) && (caneat==1)) { fl=1; if (makeMove(tp)==false) fl=0;  }
		
		if ((i==0) && (fl==1)) //���� ����� �� ����� ����
		{
			change=1;
			piece.posI=i;
			piece.posJ=j;
			clear();
			turn=1;
			alert("��� ����� ����� ���������� �������� ������, �� ������� ������� �� ��������");
		}
		if (fl==0) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear();} 
	}
}

// ��� ����� ������
function whladya(type) 
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var k=0;
	var noteat=0;
	var tp=type; //3-��� ����� �����
	
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
		if (((i!=ii) && (j!=jj)) && (tp!=7)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
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
			if ((noteat!=0) && (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false;} 
		}
	}
}

// ��� ������ ������
function blladya(type) 
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var noteat=0;
	var k=0;
	var tp=type; //4-��� ������ �����
	
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
		if (((i!=ii) && (j!=jj)) && (tp!=8)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
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
			if ((noteat!=0) && (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false;} 
		}
	}
}

//������ ������ ����� � ����� ����
function BlackTryChange()  
{
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "ladya") if (makeMove(4)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "slon") if (makeMove(6)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "ferz") if (makeMove(8)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "kon") if (makeMove(10)==false) return false; else return true;
}

//������ ����� ����� � ����� ����
function WhiteTryChange()  
{
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "ladya") if (makeMove(3)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "slon") if (makeMove(5)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "ferz") if (makeMove(7)==false) return false; else return true;
	if ($("tr:eq(" + piece.wantI + ") > td:eq(" + piece.wantJ + ")").attr("type") == "kon") if (makeMove(9)==false) return false; else return true;
}

// ��� ����� ������
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
	var tp=type; //5-��� ����� ����
	
	if (search==1)
	{
		i = kor.blI;
		j = kor.blJ;
		ii = kor.figI;
		jj = kor.figJ;
		
		if (((i==ii) || (j==jj)) && (tp==0)) return false; 
		if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) != ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title"))) return false; 
		if (((i==ii+1) || (i==ii-1)) && ((j==jj-1) || (j==jj+1)) && (fl==0)){ search=2; fl=1; return true; }
		if ((i>ii) && (fl==0)) //��� ����
		{
			if (j>jj)  //������
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
			
			if ((j<jj) && (fl==0))  //�����
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
		
		if ((i<ii) && (fl==0)) //���� ����
		{
			if (j>jj)  //������
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
			
			if ((j<jj) && (fl==0))  //�����
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
		if ((($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) != ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title"))) && (tp!=7)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		if (((i==ii) || (j==jj)) && (tp!=7)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		if (((i==ii+1) || (i==ii-1)) && ((j==jj-1) || (j==jj+1)) && (fl==0)){ fl=1; if (makeMove(tp)==false) fl2=0;}
		if ((i>ii) && (fl==0)) //��� ����
		{
			if (j>jj)  //������
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
			
			if ((j<jj) && (fl==0))  //�����
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
		
		if ((i<ii) && (fl==0)) //���� ����
		{
			if (j>jj)  //������
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
			
			if ((j<jj) && (fl==0))  //�����
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
		if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		else return true;	
	}
}

// ��� ������ ������
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
	var tp=type; //6-��� ������ ����
	
	if (search==1)
	{
		i = kor.whI;
		j = kor.whJ;
		ii = kor.figI;
		jj = kor.figJ;
		
		if (((i==ii) || (j==jj)) && (tp==0)) return false; 
		if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) != ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title"))) return false; 
		if (((i==ii+1) || (i==ii-1)) && ((j==jj-1) || (j==jj+1)) && (fl==0)){ search=2; fl=1; return true; }
		if ((i>ii) && (fl==0)) //��� ����
		{
			if (j>jj)  //������
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
			
			if ((j<jj) && (fl==0))  //�����
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
		
		if ((i<ii) && (fl==0)) //���� ����
		{
			if (j>jj)  //������
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
			
			if ((j<jj) && (fl==0))  //�����
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
		if ((($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) != ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title"))) && (tp!=8)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }	
		if (((i==ii) || (j==jj)) && (tp!=8)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		if (((i==ii+1) || (i==ii-1)) && ((j==jj-1) || (j==jj+1)) && (fl==0)) { fl=1; if (makeMove(tp)==false) fl2=0;}
		if ((i>ii) && (fl==0)) //��� ����
		{
			if (j>jj)  //������
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
			
			if ((j<jj) && (fl==0))  //�����
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
		
		if ((i<ii) && (fl==0)) //���� ����
		{
			if (j>jj)  //������
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
			
			if ((j<jj) && (fl==0))  //�����
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
		if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		else return true;	 		
	}
}
	
//��� ����� ������	
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

//��� ������ ������
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
	
//��� ����� �����	
function whkon()
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var tp=9; //��� ����� ����
	
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
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		if ((i==ii+1) && ((j==jj+2) || (j==jj-2))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii+2) && ((j==jj+1) || (j==jj-1))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii-1) && ((j==jj+2) || (j==jj-2))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii-2) && ((j==jj+1) || (j==jj-1))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		
		if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false;}
		else return true;	
	}
}	

//��� ������ �����	
function blkon()
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var tp=10; //��� ������ ����
	
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
		if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "korol") { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false; }
		
		if ((i==ii+1) && ((j==jj+2) || (j==jj-2))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii+2) && ((j==jj+1) || (j==jj-1))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii-1) && ((j==jj+2) || (j==jj-2))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		if ((i==ii-2) && ((j==jj+1) || (j==jj-1))) { fl=1; if (makeMove(tp)==false) fl2=0; }
		
		if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false;}
		else return true;	
	}
}
	
//��� ����� �������
function whkorol()
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var tp=11;  //��� ����� ������
	
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

	if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false;}
	else return true;
}

//��� ������ �������
function blkorol()
{
	var i = piece.wantI;
	var j = piece.wantJ;
	var ii = piece.posI;
	var jj = piece.posJ;
	var fl=0; var fl2=1;
	var tp=12;  //��� ������ ������
	
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
	
	if ((fl==0) || (fl2==0)) { $("tr:eq(" + piece.posI + ") > td:eq(" + piece.posJ + ")").css("border", "1px solid green"); alert("��� ����������!!!"); clear(); return false;}
	else return true;
}

//���� �� ��� 
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

//���� �� ���� ������ ������
function hodkor() 
{
	var i = 0; var j = 0; 

	var fl1=0;  //���� �� ������ ������ ���� �������
	var fl2=0; // �� ��� � � ��������� ����� ����
	
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
	
	if ((fl1==8) || (fl2!=0)) return false;  //������ ������ ������ ������� �� ����: ���� ��� ������ ������ ������, ���� ��� ��������� ���� ����� �������� ���
	if ((fl1<8) && (fl2==0)) return false;
	else return true;
}

//����� �� ��������� ��� ����� ���� ��������� ����� ������
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

//����� �� ����� ������ ���� ������� �� ����
function peashkahelp(k,s)
{
	var i=kor.I; var j=kor.J;
	var ii=k; var jj=s;
	var ki=0; var kj=0;
	var g=0; var t=0; var p=0; var noteat=0;
	
	if (turn==1) { ki=kor.blI; kj=kor.blJ; }
	if (turn==0) { ki=kor.whI; kj=kor.whJ; }
	
	//����� ����� �������� �������,���� ��
	if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya"))
	{
		if (turn==1) { if ((i==ii+1) && ((j==jj+1) || (j==jj-1))) return true; }
		if (turn==0) { if ((i==ii-1) && ((j==jj+1) || (j==jj-1))) return true; }
	}
	
	//����� ����� �������� �����, ����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya")
	{
		if ((j>kj) && (i==ki))    // ��� � ������ � ����� ����, �� ��� ������
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
				
		if ((j<kj) && (i==ki))    // ��� � ������ � ����� ����, �� ��� �����
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
	
	//����� ����� �������� �����, ����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
	{
		if (i>ki) //��� ����
		{
			if (j>kj)  //������
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
			
			if (j<jj)  //�����
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
		
		if (i<ki) //���� ����
		{
			if (j>kj)  //������
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
			
			if (j<jj)  //�����
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
	
	//����� ����� �������� �����, ����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz")
	{
		if ((j>kj) && (i==ki))    // ��� � ������ � ����� ����, �� ��� ������
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
				
		if ((j<kj) && (i==ki))    // ��� � ������ � ����� ����, �� ��� �����
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
		
		if (i>ki) //��� ����
		{
			if (j>kj)  //������
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
			
			if (j<jj)  //�����
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
		
		if (i<ki) //���� ����
		{
			if (j>kj)  //������
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
			
			if (j<jj)  //�����
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

//����� �� ����� ������ ���� ������� �� ����
function ladyahelp(k,s)
{
	var i=kor.I; var j=kor.J;
	var ii=k; var jj=s;
	var ki=0; var kj=0;
	var g=0; var t=0; var x=0; var y=0; var noteat=0;
	
	if (turn==1) { ki=kor.blI; kj=kor.blJ; }
	if (turn==0) { ki=kor.whI; kj=kor.whJ; }
	
	//����� ����� �������� ������,���� � 
	if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya") && ((i==ii) || (j==jj)))
	{ 
		if (i==ii)
		{
			if ((j==jj+1) || (j==jj-1)) return true; 
				
			if (j>jj) //���� ���,���������� ������
			{
				for(g = jj+1; g < j; g++)
				{
					if ($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
				}
				if (noteat==0) return true;
			}
				
			if (j<jj)
			{
				for(g = g-1; g > j; g=g-1) //���� ���,���������� �����
				{
					if ($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
				}
				if (noteat==0) return true;
			}
		}
		else if (j==jj)
		{
			if ((i==ii+1) || (i==ii-1)) return true;
				
			if (i>ii)  //���� �������,���������� ����
			{
				for(t = ii+1; t < i; t++)
				{
					if ($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
				}
				if (noteat==0) return true;
			}
				
			if (i<ii)  //���� �������,���������� ����
			{
				for(k = i+1; k < ii; k++)
				{
					if ($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("type") != "free") noteat++;
				}
				if (noteat==0) return true;
			}
		}
	}
	
	//����� ����� �������� �����,����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya")
	{
		if (i==ki)
		{
			if (j>kj)  //���� ���,���������� ������
			{
				for (g=kj+1; g<j; g++)
				{
					if ((jj==g) && (ii<i))  //��������� ������ ������
					{
						noteat=1;
						for (t=ii+1; t<i; t++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((jj==g) && (ii>i))  //��������� ������ �����
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
			
			if (j<kj)  //���� ���,���������� �����
			{
				for (g=kj-1; g>j; g=g-1)
				{
					if ((jj==g) && (ii<i))  //��������� ������ ������
					{
						noteat=1;
						for (t=ii+1; t<i; t++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((jj==g) && (ii>i))  //��������� ������ �����
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
			if (i>ki)  //���� ������, ���������� ����
			{
				for (t=ki+1; t<i; t++)
				{
					if ((ii=t) && (jj>j))  //��������� ������
					{
						noteat=1;
						for (g=j+1; g<jj; g++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((ii=t) && (jj>j))  //��������� ����� 
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
			
			if (i<ki)  //���� ������, ���������� ����
			{
				for (t=ki-1; t>i; t=t-1)
				{
					if ((ii=t) && (jj>j))  //��������� ������
					{
						noteat=1;
						for (g=j+1; g<jj; g++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((ii=t) && (jj>j))  //��������� ����� 
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
		
	//����� ����� �������� �����,����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
	{
		if (i>ki)  //��� ����
		{
			if (j>kj)  //���������� ������
			{
				g=kj;
				for (t=ki+1;t>i;t++)
				{
					if (g<j) g++;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //��������� ������ 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //��������� ����� 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //��������� �����
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //��������� �������
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
						
			if (j<kj)  //���������� �����
			{
				g=kj;
				for (t=ki+1;t>i;t++)
				{
					if (g>j) g=g-1;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //��������� ������ 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //��������� ����� 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //��������� �����
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //��������� �������
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
		
		if (i<ki)  //���� ����
		{
			if (j>kj)  //���������� ������
			{
				g=kj;
				for (t=ki-1;t<i;t=t-1)
				{
					if (g<j) g++;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //��������� ������ 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //��������� ����� 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //��������� �����
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //��������� �������
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
						
			if (j<kj)  //���������� �����
			{
				g=kj;
				for (t=ki-1;t<i;t=t-1)
				{
					if (g>j) g=g-1;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //��������� ������ 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //��������� ����� 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //��������� �����
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //��������� �������
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
	
	//����� ����� �������� �����,����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz")
	{
		if (i==ki)
		{
			if (j>kj)  //���� ���,���������� ������
			{
				for (g=kj+1; g<j; g++)
				{
					if ((jj==g) && (ii<i))  //��������� ������ ������
					{
						noteat=1;
						for (t=ii+1; t<i; t++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((jj==g) && (ii>i))  //��������� ������ �����
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
			
			if (j<kj)  //���� ���,���������� �����
			{
				for (g=kj-1; g>j; g=g-1)
				{
					if ((jj==g) && (ii<i))  //��������� ������ ������
					{
						noteat=1;
						for (t=ii+1; t<i; t++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((jj==g) && (ii>i))  //��������� ������ �����
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
			if (i>ki)  //���� ������, ���������� ����
			{
				for (t=ki+1; t<i; t++)
				{
					if ((ii=t) && (jj>j))  //��������� ������
					{
						noteat=1;
						for (g=j+1; g<jj; g++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((ii=t) && (jj>j))  //��������� ����� 
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
			
			if (i<ki)  //���� ������, ���������� ����
			{
				for (t=ki-1; t>i; t=t-1)
				{
					if ((ii=t) && (jj>j))  //��������� ������
					{
						noteat=1;
						for (g=j+1; g<jj; g++)
						{
							if ($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
					}
					
					if ((ii=t) && (jj>j))  //��������� ����� 
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
		
		else if (i>ki)  //��� ����
		{
			if (j>kj)  //���������� ������
			{
				g=kj;
				for (t=ki+1;t>i;t++)
				{
					if (g<j) g++;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //��������� ������ 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //��������� ����� 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //��������� �����
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //��������� �������
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
						
			if (j<kj)  //���������� �����
			{
				g=kj;
				for (t=ki+1;t>i;t++)
				{
					if (g>j) g=g-1;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //��������� ������ 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //��������� ����� 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //��������� �����
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //��������� �������
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
		
		else if (i<ki)  //���� ����
		{
			if (j>kj)  //���������� ������
			{
				g=kj;
				for (t=ki-1;t<i;t=t-1)
				{
					if (g<j) g++;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //��������� ������ 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //��������� ����� 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //��������� �����
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //��������� �������
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
						
			if (j<kj)  //���������� �����
			{
				g=kj;
				for (t=ki-1;t<i;t=t-1)
				{
					if (g>j) g=g-1;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					if (ii==t)
					{
						if (jj>g)  //��������� ������ 
						for (y=g+1; y<jj; y++)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}
						if (jj<g)  //��������� ����� 
						for (y=g-1; y>jj; y=y-1)
						{
							noteat=1;
							if ($("tr:eq(" + t + ") > td:eq(" + y + ")").attr("type") != "free") noteat++;
						}	
						if (noteat==1) return true;
					}
					if (jj==g)
					{
						if (ii>t)  //��������� �����
						for (x=t+1; x<ii; x++)
						{
							noteat=1;
							if ($("tr:eq(" + x + ") > td:eq(" + g + ")").attr("type") != "free") noteat++;
						}
						if (ii<t)  //��������� �������
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

//����� �� ���� ������ ���� ������� �� ����
function slonhelp(k,s)
{
	var i=kor.I; var j=kor.J;
	var ii=k; var jj=s;
	var ki=0; var kj=0;
	var g=0; var t=0; var x=0; var y=0; var fl=0; var fl2=0; var noteat=0;
	
	if (turn==1) { ki=kor.blI; kj=kor.blJ; }
	if (turn==0) { ki=kor.whI; kj=kor.whJ; }
	
	//���� ����� �������� ������,���� � 
	if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya") && ((i!=ii) && (j!=jj))
		&& ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
	{ 
	
		if (((i==ii+1) || (i==ii-1)) && ((j==jj-1) || (j==jj+1))) return true; 
		if (i>ii) //��� ����
		{
			if (j>jj)  //���������� ������
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
			
			if (j<jj)  //���������� �����
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
		
		if (i<ii)  //���� ����
		{
			if (j>jj)  //���������� ������
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
			
			if (j<jj)  //���������� �����
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
	
	//���� ����� �������� �����,����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya")
	{
		if (i==ki)
		{
			if (j>kj)  //���� ���,���������� ������
			{
				for (g=kj+1; g<j; g++)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>i) //��� ����
						{
							if (jj>g)  //��������� ������
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
							
							if (jj<g)  //��������� �����
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
						
						if (i<ii)  //���� ����
						{
							if (j>jj)  //��������� ������
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
							
							if (j<jj)  //��������� �����
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
			if (j<kj)  //���� ���,���������� �����
			{
				for (g=kj-1; g>j; g=g-1)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>i) //��� ����
						{
							if (jj>g)  //��������� ������
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
							
							if (jj<g)  //��������� �����
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
						
						if (i<ii)  //���� ����
						{
							if (j>jj)  //��������� ������
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
							
							if (j<jj)  //��������� ������
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
			if (i>ki)  //���� ������, ���������� ����
			{
				for (t=ki+1; t<i; t++)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					if (($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>t) //��� ����
						{
							if (jj>j)  //��������� ������
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
							
							if (jj<j)  //��������� �����
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
						
						if (ii<t)  //���� ����
						{
							if (jj>j)  //��������� ������
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
							
							if (j<jj)  //��������� ������
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
			if (i<ki)  //���� ������, ���������� ����
			{
				for (t=ki-1; t>i; t=t-1)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>t) //��� ����
						{
							if (jj>j)  //��������� ������
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
							
							if (jj<j)  //��������� �����
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
						
						if (ii<t)  //���� ����
						{
							if (jj>j)  //��������� ������
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
							
							if (j<jj)  //��������� ������
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
			
	//���� ����� �������� �����,����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
	{
		if (i>ki) //��� ����
		{
			if (j>kj)  //���������� ������
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g<j) g++;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj<g)) // ��������� ����� ����� 
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
							
							if ((ii<t) && (jj>g)) // ��������� ������ ������� 
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
			
			if (j<kj)  //���������� �����
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g>j) g=g-1;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj>g)) // ��������� ������ ����� 
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
							
							if ((ii<t) && (jj>g)) // ��������� ����� ������� 
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
			
		if (i<ki) //���� ����
		{
			if (j>kj)  //���������� ������
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g<j) g++;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj>g)) // ��������� ������ ����� 
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
							
							if ((ii<t) && (jj>g)) // ��������� ����� ������� 
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
			
			if (j<kj)  //���������� ������
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g>j) g=g-1;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj<g)) // ��������� ����� ����� 
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
							
							if ((ii<t) && (jj>g)) // ��������� ������ ������� 
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
	
	//���� ����� �������� �����,����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
	{
		if (i==ki)
		{
			if (j>kj)  //���� ���,���������� ������
			{
				for (g=kj+1; g<j; g++)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>i) //��� ����
						{
							if (jj>g)  //��������� ������
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
							
							if (jj<g)  //��������� �����
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
						
						if (i<ii)  //���� ����
						{
							if (j>jj)  //��������� ������
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
							
							if (j<jj)  //��������� �����
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
			if (j<kj)  //���� ���,���������� �����
			{
				for (g=kj-1; g>j; g=g-1)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + i + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>i) //��� ����
						{
							if (jj>g)  //��������� ������
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
							
							if (jj<g)  //��������� �����
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
						
						if (i<ii)  //���� ����
						{
							if (j>jj)  //��������� ������
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
							
							if (j<jj)  //��������� ������
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
			if (i>ki)  //���� ������, ���������� ����
			{
				for (t=ki+1; t<i; t++)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					if (($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>t) //��� ����
						{
							if (jj>j)  //��������� ������
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
							
							if (jj<j)  //��������� �����
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
						
						if (ii<t)  //���� ����
						{
							if (jj>j)  //��������� ������
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
							
							if (j<jj)  //��������� ������
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
			if (i<ki)  //���� ������, ���������� ����
			{
				for (t=ki-1; t>i; t=t-1)
				{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
					if (($("tr:eq(" + t + ") > td:eq(" + j + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
					{
						if (ii>t) //��� ����
						{
							if (jj>j)  //��������� ������
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
							
							if (jj<j)  //��������� �����
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
						
						if (ii<t)  //���� ����
						{
							if (jj>j)  //��������� ������
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
							
							if (j<jj)  //��������� ������
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
		if (i>ki) //��� ����
		{
			if (j>kj)  //���������� ������
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g<j) g++;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj<g)) // ��������� ����� ����� 
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
							
							if ((ii<t) && (jj>g)) // ��������� ������ ������� 
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
			
			if (j<kj)  //���������� �����
			{
				g=kj;
				for (t=ki+1;t<i;t++)
				{
					if (g>j) g=g-1;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj>g)) // ��������� ������ ����� 
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
							
							if ((ii<t) && (jj>g)) // ��������� ����� ������� 
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
			
		if (i<ki) //���� ����
		{
			if (j>kj)  //���������� ������
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g<j) g++;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj>g)) // ��������� ������ ����� 
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
							
							if ((ii<t) && (jj>g)) // ��������� ����� ������� 
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
			
			if (j<kj)  //���������� ������
			{
				g=kj;
				for (t=ki-1;t>i;t=t-1)
				{
					if (g>j) g=g-1;
					{
						if (($("tr:eq(" + t + ") > td:eq(" + g + ")").attr("title")) == ($("tr:eq(" + ii + ") > td:eq(" + jj + ")").attr("title")))
						{
							if ((ii>t) && (jj<g)) // ��������� ����� ����� 
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
							
							if ((ii<t) && (jj>g)) // ��������� ������ ������� 
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

//����� �� ����� ������ ���� ������� �� ����
function ferzhelp(k,s)
{
	var i=k; var j=s;
	if (((ladyahelp(i,j)) != true) || ((slonhelp(i,j)) != true)) return false;
	else return true;
}

//����� �� ���� ������ ���� ������� �� ����
function konhelp(k,s)
{
	var i=kor.I; var j=kor.J;
	var ii=k; var jj=s;
	var ki=0; var kj=0;
	var g=0; var t=0; var p=0;
	
	if (turn==1) { ki=kor.blI; kj=kor.blJ; }
	if (turn==0) { ki=kor.whI; kj=kor.whJ; }
	
	//���� ����� �������� �������,���� ��
	if (($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "peshka") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "kon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz") || ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
		|| ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya"))
	{
		if ((i==ii+1) && ((j==jj+2) || (j==jj-2))) return true;
		if ((i==ii+2) && ((j==jj+1) || (j==jj-1))) return true; 
		if ((i==ii-1) && ((j==jj+2) || (j==jj-2))) return true; 
		if ((i==ii-2) && ((j==jj+1) || (j==jj-1))) return true; 
	}
	
	//���� ����� �������� �����, ����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ladya")
	{
		if ((j>kj) && (i==ki))    // ��� � ������ � ����� ����, �� ��� ������
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
				
		if ((j<kj) && (i==ki))    // ��� � ������ � ����� ����, �� ��� �����
		{
			t=i;
			for(g = kj-1; g < j; g=g-1)
			{	if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
				if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
				if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
				if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
			}
		}
		
		if ((i>ki) && (j==kj))    // ��� � ������ � ����� �������, �� ��� ����
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
		
		if ((i>ki) && (j==kj))    // ��� � ������ � ����� �������, �� ��� ����
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
	
	//���� ����� �������� �����, ����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "slon")
	{
		if (i>ki) //��� ����
		{
			if (j>kj)  //������
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
			
			if (j<jj)  //�����
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
		
		if (i<ki) //���� ����
		{
			if (j>kj)  //������
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
			
			if (j<jj)  //�����
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
	
	//���� ����� �������� �����, ����������� ����� ����
	if ($("tr:eq(" + i + ") > td:eq(" + j + ")").attr("type") == "ferz")
	{
		if ((j>kj) && (i==ki))    // ��� � ������ � ����� ����, �� ��� ������
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
				
		if ((j<kj) && (i==ki))    // ��� � ������ � ����� ����, �� ��� �����
		{
			t=i;
			for(g = kj-1; g < j; g=g-1)
			{	if ((t==ii+1) && ((g==jj+2) || (g==jj-2))) return true;
				if ((t==ii+2) && ((g==jj+1) || (g==jj-1))) return true; 
				if ((t==ii-1) && ((g==jj+2) || (g==jj-2))) return true; 
				if ((t==ii-2) && ((g==jj+1) || (g==jj-1))) return true; 
			}
		}
		
		if ((i>ki) && (j==kj))    // ��� � ������ � ����� �������, �� ��� ����
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
		
		if ((i>ki) && (j==kj))    // ��� � ������ � ����� �������, �� ��� ����
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
	
		if (i>ki) //��� ����
		{
			if (j>kj)  //������
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
			
			if (j<jj)  //�����
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
		
		if (i<ki) //���� ����
		{
			if (j>kj)  //������
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
			
			if (j<jj)  //�����
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

//����� �� ���� ������ ������ ��� ��� ���������� ��� ����
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
	
	if (ch!=0) return false;  //����� �� ����� ������ ������
}

//����� �������� �� ��� � ���
function check()
{
	if (chah()== false) return false;   //���� ����-������ ������
	else if ((korkol==1) && ((hodkor()== true) || (caneat()==true))) { alert("���!"); return false;}	 // ������ ����� ��� ���� �� ���� ��� ��� ����� ��������
	if ((hodkor()== false) && (korkol>1)) return true;  //��� � ���
	if ((hodkor()== false) && (caneat()==false)) return true; //��� � ���
}









