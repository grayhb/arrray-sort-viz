export function cocktailSort(arr) {
    
    let animations = [];

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        for (let i = left; i < right; i++) {
            
            let anim = {};
            anim.comp = [i, i + 1];

            if (arr[i] > arr[i + 1]) {
                anim.swap = [i, i + 1];
                swap(arr, i, i + 1);
            }

            animations.push(anim);
        }
        right--;
        for (let i = right; i > left; i--) {

            let anim = {};
            anim.comp = [i, i - 1];

            if (arr[i] < arr[i - 1]) {
                anim.swap = [i, i - 1];
                swap(arr, i, i - 1);
            }

            animations.push(anim);
        }
        left++;
    }
    return [arr, animations];
}

function swap(arr, i, j) {
    let swap = arr[i];
    arr[i] = arr[j];
    arr[j] = swap;
}