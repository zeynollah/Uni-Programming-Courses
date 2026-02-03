<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <title>Vill du bli min Valentine? 💖</title>
    <style>
        body {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #ff9a9e, #fad0c4);
        }

        .container {
            text-align: center;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 40px;
        }

        button {
            font-size: 1.2rem;
            padding: 15px 30px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            margin: 10px;
        }

        #yes {
            background-color: #ff4d6d;
            color: white;
        }

        #no {
            background-color: #adb5bd;
            color: white;
            position: absolute;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Vill du bli min Valentine? 💘</h1>
    <button id="yes" onclick="yesClicked()">JA 💖</button>
    <button id="no" onmouseover="moveNo()">NEJ 💔</button>
</div>

<script>
    function moveNo() {
        const button = document.getElementById("no");
        const x = Math.random() * (window.innerWidth - button.offsetWidth);
        const y = Math.random() * (window.innerHeight - button.offsetHeight);

        button.style.left = x + "px";
        button.style.top = y + "px";
    }

    function yesClicked() {
        document.body.innerHTML = `
            <h1 style="text-align:center; margin-top:40vh;">
                YAAAY!! 💕🥰<br>
                Jag älskar dig!Da jigaret mallagh!!
            </h1>
        `;
    }
</script>

</body>
</html>
