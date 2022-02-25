const form = document.querySelector("form")
const input = document.querySelector("input").value

form.onsubmit = (x) => {
    x.preventDefault()
}

const xml = new XMLHttpRequest()
xml.open("POST", "./add", true)

const form = new FormData(form)
xml.send(form)
        