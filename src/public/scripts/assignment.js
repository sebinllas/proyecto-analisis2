assignmentBtn = document.getElementById('new-assignment-btn');
assignmentOptions = document.getElementById('assignment-options');
console.log('holaaa');
assignmentBtn.addEventListener('click', handleClick => {
    if (assignmentOptions.style.display === "block") {
        assignmentOptions.style.display = "none";
        assignmentBtn.innerHTML = 'Nueva actividad';
    } else {
        assignmentOptions.style.display = "block";
        assignmentBtn.innerHTML = '✖️';
    }
})
