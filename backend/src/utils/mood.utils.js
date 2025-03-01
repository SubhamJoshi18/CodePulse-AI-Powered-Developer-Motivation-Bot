


function checkMood(mood){

    switch(mood) {

        case 'Happy' : {
            return true
        }

        case 'Stress' : {
            return false
        }

        case 'Motivated' : {
            return true
        }

        case 'Sad': {
            return false
        }

        default : {
            return true
        }
    }   

}

export {
    checkMood
}