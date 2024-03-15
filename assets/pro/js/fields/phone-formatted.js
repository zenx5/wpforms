console.log('is running phone-formatted.js')

document.querySelectorAll("input[data-is-formatted='false']").forEach(function (input) {
    //create a phone input with select for country flags
    const precontainer = document.createElement('div')
    const container = document.createElement('div')
    precontainer.classList.add('wpforms-field')
    precontainer.appendChild(container)
    container.classList.add('input-group')
    container.classList.add('phone-formatted')
    input.parentNode.insertBefore(container, input)
    const inputGroupPrepend = document.createElement('div')
    inputGroupPrepend.classList.add('input-group-prepend')
    container.appendChild(inputGroupPrepend)
    container.appendChild(input)
    const select = document.createElement('div')
    select.classList.add('custom-select')
    inputGroupPrepend.appendChild(select)
    const buttonSelect = document.createElement('button')
    buttonSelect.classList.add('btn-select')
    const spanButton = document.createElement('span')
    spanButton.classList.add('flag-icon')
    spanButton.style.height = `10px`
    spanButton.style.backgroundPosition = `0px 0px`
    buttonSelect.appendChild(spanButton)
    buttonSelect.addEventListener('click', function(e) {
        e.preventDefault()
        select.classList.toggle('open')
    })
    select.appendChild(buttonSelect)
    const ul = document.createElement('ul')
    ul.classList.add('options-select')
    select.appendChild(ul)
    let index = 0
    for(const [countryName, countryCode, countryPhoneCode] of countries){
        const option = document.createElement('li')
        option.classList.add('option')
        option.setAttribute('data-value', countryPhoneCode)
        option.setAttribute('data-code', countryCode)
        option.innerText = `${countryName} (${countryPhoneCode})`
        option.addEventListener('click', function(e) {
            e.preventDefault()
            select.classList.toggle('open')
            console.log( flagsPosition, e.target.dataset.code )

            const { backgroundPosition, height } = flagsPosition[ e.target.dataset.code ] ?? { backgroundPosition:0, height:10 }
            console.log( backgroundPosition, height )
            spanButton.style.height = `${height}px`
            spanButton.style.backgroundPosition = `${backgroundPosition}px 0px`
            input.value = e.target.dataset.value
            input.dataset.code = e.target.dataset.value
            const length = code_x_length[ input.value ] + input.value.length
            input.setAttribute('maxLength', length)
            input.setAttribute('minLength', length)
            input.classList.remove('phone-formatted-'+input.dataset.country)
            input.classList.add('phone-formatted-'+input.value)
            input.dataset.country = input.value
        })
        const flag = document.createElement('span')
        flag.classList.add('flag-icon')
        const { backgroundPosition, height } = flagsPosition[ countryCode ] ?? { x:0, y:0, height:10 }
        flag.style.height = `${height}px`
        flag.style.backgroundPosition = `${backgroundPosition}px 0px`
        option.appendChild(flag)
        ul.appendChild(option)
        index++
    }
    input.setAttribute('type', 'tel')
    input.classList.add('form-control')
    input.classList.add('phone')
    input.classList.add('phone-formatted')
    input.classList.add('phone-formatted-'+select.value)
    input.setAttribute('data-country', select.value)
    input.setAttribute('data-is-formatted', 'true')

    input.addEventListener('input', function(event) {
        if( !event.data ) {
            const code = event.target.dataset.code ?? ''
            if( event.target.value.indexOf(code) !== 0 )  event.target.value = code
        }
        if( !/^\d+$/.test(event.target.value) ) {
            event.target.value = event.target.value.slice(0, -1);
        }

    })

    input.addEventListener('keydown', function(event) {
        const cursorPosition = event.target.selectionStart
        const offsetPosition = event.target.dataset.code.length ?? 0
        if( cursorPosition < offsetPosition ) {
            event.target.selectionStart = offsetPosition
        }
    })

    select.addEventListener('change', function(e) {
        const countryCode = e.target.value;
        input.value = countryCode
        input.dataset.code = countryCode
        const length = code_x_length[ input.value ] + input.value.length
        input.setAttribute('maxLength', length)
        input.setAttribute('minLength', length)
    })
})