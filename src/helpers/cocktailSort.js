export function cocktailSort(items) {
    
    let animations = [];

    let left = firstSwap = 0;
    let right = lastSwap = arr.length - 1;

    while (left < right) {
        for (let i = left; i < right; i++) {
            
            let anim = {};
            anim.comp = [i, i + 1];

            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
                anim.swap = [i, i + 1];
                lastSwap = i;
            }

            animations.push(anim);
        }
        
        right = lastSwap;
        for (let i = right; i > left; i--) {
           
            let anim = {};
            anim.comp = [i, i - 1];

            if (arr[i] < arr[i - 1]) {
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]
                anim.swap = [i, i - 1];
                firstSwap = i;
            }

            animations.push(anim);
        }
        left = firstSwap;
    }

    return [items, animations];
};