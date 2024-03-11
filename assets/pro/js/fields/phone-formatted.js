console.log('is running phone-formatted.js')

document.querySelectorAll("input[data-is-formatted='false']").forEach(function (input) {
    console.log(input)
    //create a phone input with select for country flags
    const container = document.createElement('div')
    container.classList.add('input-group')
    container.classList.add('phone-formatted')
    for(const className of input.classList ) {
        if( className==='wpforms-field-medium' ) {
            container.style.width = '60%'
            input.style.width = '100%'
            input.classList.remove(className)
        }
    }
    input.parentNode.insertBefore(container, input)
    const inputGroupPrepend = document.createElement('div')
    inputGroupPrepend.classList.add('input-group-prepend')
    container.appendChild(inputGroupPrepend)
    container.appendChild(input)
    const select = document.createElement('select')
    select.classList.add('custom-select')
    inputGroupPrepend.appendChild(select)
    for(const [countryName, countryCode, countryPhoneCode] of countries){
        const option = document.createElement('option')
        option.value = countryPhoneCode
        option.text = `${countryName} (${countryCode})`
        select.appendChild(option)
    }
    select.value = 'US'
    input.setAttribute('type', 'tel')
    input.setAttribute('placeholder', 'Phone')
    input.classList.add('form-control')
    input.classList.add('phone')
    input.classList.add('phone-formatted')
    input.classList.add('phone-formatted-'+select.value)
    input.setAttribute('data-country', select.value)
    input.setAttribute('data-is-formatted', 'true')



})