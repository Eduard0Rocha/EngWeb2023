exports.mainPage = function(tasks) {

    var pagHTML = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TO DO List</title>
    <link rel="stylesheet" href="w3.css">
</head>
<body style="margin: 40px">
    <div class="w3-card-4">

        <div class="w3-container w3-green">
          <h2>TODO List</h2>
        </div>
        
        <form class="w3-container" method="post">
        
            <label for="who">UserName</label>
            <input class="w3-input" id="who" name="who" type="text">
        
            <label for="what">Task</label>
            <input class="w3-input" id="what" name="what" type="text">
            
            <button class="w3-btn w3-purple w3-mb-2" type="submit" value="Submit">Add</button>

        </form>
        
    </div>

    <div style="margin-top: 30px">

        <div class="w3-container w3-red w3-cell">
            <h1>TODO</h1>`;

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].done) continue;

        pagHTML += `<a href="/task/${tasks[i].id}"><p>${tasks[i].what}</p></a>`
    }

    pagHTML += `
        </div>
          
            <div class="w3-container w3-green w3-cell">
                <h1>DONE</h1>
    `;

    for (let i = 0; i < tasks.length; i++) {

        if (!tasks[i].done) continue;

        pagHTML += `<a href="/task/${tasks[i].id}"><p>${tasks[i].what}</p></a>`
    }
    
    pagHTML += `
        </div>

    </div>

</body>
</html>
    `
    return pagHTML;
}

exports.taskPage = function (task) {

    pagHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TO DO List</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body style="margin: 40px">
        <div class="w3-card-4">
    
            <div class="w3-container w3-green">
              <h2>${task.what}</h2>
            </div>
            
            <form class="w3-container" method="post">
            
                <label>What</label>
                <input class="w3-input" type="text">
                
                <button class="w3-btn w3-purple w3-mb-2" type="submit">Edit</button>
    
                <a href="/done/${task.id}" class="w3-btn w3-purple w3-mb-2">DONE</a>
    
            </form>
    
    </body>
    </html>
    `

    return pagHTML;
}