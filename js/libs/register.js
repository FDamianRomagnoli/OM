let buttonRegister = document.getElementById("btnregister")
let email = "fdamianromagnoli@gmail.com"


buttonRegister.addEventListener('click', () => {
    fetch('https://open.kickbox.com/v1/disposable/mailinator.com')
	.then(response => response.json())
	.then(response => console.log(response))
})


