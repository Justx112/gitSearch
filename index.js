const button = document.querySelector('.search__button')
const input = document.querySelector('.search__input')
const container = document.querySelector('.container_result')
const data = null

button.addEventListener('click', fetchData)

async function fetchData() {
    container.innerHTML=''
    const data = await fetch(`https://api.github.com/search/repositories?q=${input.value.trim()}&per_page=10`).then(
        successResponse => {
            if (successResponse.status == 200) {
                return successResponse.json()
            } 
            else if (successResponse.status){
                return data.code = successResponse.status
            }
        },
        failResponse => {
            return null
        }
    )
    data?.items.forEach((elem)=>{
        let responseHTMLtemplate = `
        <div class="result">
                <p class="result__id">id:${elem.id}</p>
                <img src="${elem.owner.avatar_url}" alt="" class="result__image">
                <a href="${elem.owner.html_url}" class="result__owner_link"  target="_blank">${elem.owner.login}</a>
                <p>Repository:<a href="${elem.html_url}" class="result__git_link"  target="_blank">${elem.name}</a></p>
                <p class="result__language">language: ${elem.language}</p>
            </div>
        `
        container.insertAdjacentHTML('afterbegin', responseHTMLtemplate)
    })
    if (data.code){
        let responseHTMLtemplate;
        switch (data.code){
            case 422:
                responseHTMLtemplate='<h1>Простите, слишком много запросов(</h1>'
                break;
            case 503:
                responseHTMLtemplate = '<h1>Простите, сервис временно не доступен(</h1>'
                break
            default:
                responseHTMLtemplate = `<h1>Простите, что то пошло не так код ошибки ${data.code}(</h1>`
                break;
        }
        container.insertAdjacentHTML('afterbegin', responseHTMLtemplate)
    }
}

