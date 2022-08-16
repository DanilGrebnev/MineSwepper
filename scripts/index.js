import { $, shuffle } from './fn.js'
document.addEventListener('DOMContentLoaded', _ => startGame(8, 8, 12))

function startGame(WIDTH, HEIGHT, BOMBS_COUNT) {
    const $form = $('form')
    const $button = $form.querySelector('button')
    const $inp = $form.querySelectorAll('input') 
    const $field = $('#field')
    //Количество ячеек
    const cellsCount = WIDTH * HEIGHT
    $field.innerHTML = '<button></button>'.repeat(cellsCount)
    //Создадим массив бомб и отсортируем в случайном порядке
    const bombs = shuffle([...Array(cellsCount).keys()])
        .slice(0, BOMBS_COUNT)

    const cells = [...$field.children]

    let closedCount = cellsCount

    $field.onclick = e => {
        if (e.target.localName !== 'button') return
        //Получаем индекс элемента
        const index = cells.indexOf(e.target)
        //Получаем колонку
        const col = index % WIDTH
        //Получаем строку
        const row = Math.floor(index / WIDTH)
        open(row, col)
    }

    $field.oncontextmenu = e => {
        e.preventDefault()
        e.target.classList.add('flag')
    }

    function open(row, col) {
        if (!isValid(row, col)) return

        const index = row * WIDTH + col
        const cell = cells[index]

        if (cell.disabled === true) return

        cell.disabled = true

        const count = getCount(row, col)

        if (isBomb(row, col)) {
            cell.classList.add('bomb')
            alert('You lose')
            startGame(8, 8, 15)
            $field.style.gridTemplateColumns = `repeat(8, 40px)`
            return
        }
        closedCount--
        if (closedCount <= BOMBS_COUNT) {
            alert("You win!")
            startGame(8, 8, 15)
            $field.style.gridTemplateColumns = `repeat(8, 40px)`
            return
        }

        if (count !== 0) {
            cell.innerText = count
            return
        }

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                open(row + y, col + x)
            }
        }
    }

    //Проверка на попадание в бомбу
    function isBomb(row, col) {
        if (!isValid(row, col)) return false
        const index = row * WIDTH + col
        return bombs.includes(index)
    }

    function getCount(row, col) {
        let count = 0
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (isBomb(row + y, col + x)) {
                    count++
                }
            }
        }
        return count
    }

    function isValid(row, col) {
        return row >= 0
            && row < HEIGHT
            && col >= 0
            && col < WIDTH
    }

    $button.onclick = e => {
        e.preventDefault()
        let inp1 = $inp[0].value
        let inp2 = $inp[1].value
        $field.style.gridTemplateColumns = `repeat(${inp1}, 40px)`
        startGame(inp1, inp1, inp2)
    }
    

}