<template>
    <v-card>

        <div class="viz-container" ref="vizContainer">
            <div v-for="(item, index) in items" 
                :key="item"
                :style="{width: itemWidth + 'px' }"
                :id="'item_' + index"
                class="array-item" ></div>
        </div>

        <v-container fluid>
            <v-row>
                <v-col>

                    <v-slider
                        v-model="itemWidth"
                        max="20"
                        min="2"
                        label="ширина"
                    ></v-slider>

                    <v-slider
                        v-model="timerInterval"
                        max="500"
                        min="0"
                        label="скорость"
                    ></v-slider>

                </v-col>
                <v-col>
                    <v-btn small class="mx-2 mb-2" color="primary" @click="createArray" block>Перемешать массив</v-btn>
                    <v-btn small class="mx-2 mb-2" @click="bubbleSort" block>Пузырьковая сортировка</v-btn>
                    <v-btn small class="mx-2 mb-2" @click="cocktailSort" block>Шейкерная сортировка</v-btn>
                    <v-btn small class="mx-2 mb-2" @click="quickSort" block>Быстрая сортировка</v-btn>
                </v-col>
            </v-row>
        </v-container>

    </v-card>
</template>

<script>

    import { bubbleSort } from '../helpers/bubbleSort'
    import { quickSort } from '../helpers/quickSort'
    import { cocktailSort } from '../helpers/cocktailSort'

    var [compA, compB] = [-1,-1];   
    var [swapA, swapB] = [-1,-1];

    export default {
        data() {
            return {
                items: [],
                animations: [],
                timerInterval: 10,
                itemWidth: 10,

                bubbleLoading: false,
                quickLoading: false,
                cocktailLoading: false,

                bubbleHaveResult: false,
                quickHaveResult: false,
                cocktailHaveResult: false,
            }
        },
        computed: {
            sorting() {
                return this.bubbleLoading || this.bubbleHaveResult
                || this.quickLoading || this.quickHaveResult
                || this.cocktailLoading || this.cocktailHaveResult
                ;
            }
        },
        mounted() {
            this.createArray();

            window.addEventListener("resize", this.resizeContainer);
        },
        watch: {
            itemWidth() {
                this.createArray();
            }
        },
        methods: {
            resizeContainer() {
                let maxItems = Math.round(this.$refs.vizContainer.clientWidth / (this.itemWidth + 2));

                if (maxItems == this.items.length)
                    return;
                
                this.createArray();
            },
            createArray() {
                
                this.eraseVariables();

                this.bubbleHaveResult = false;
                this.quickHaveResult = false;
                this.cocktailHaveResult = false;

                let maxItems = Math.round(this.$refs.vizContainer.clientWidth / (this.itemWidth + 2));
                this.items = [];

                for(let i = 1; i <= maxItems; i++) {
                    this.items.push(i);
                }

                this.shuffle();

                this.$nextTick(this.setItemsHeight);
            }, 
            setItemsHeight() {

                let k = 1;

                if (this.itemWidth >= 20)
                    k = 4;
                else if (this.itemWidth >= 10)
                    k = 3;
                else if (this.itemWidth >= 5)
                    k = 2;
                
                this.items.forEach((e, i) => {
                    
                    let itemRaw = document.getElementById('item_' + i);

                    if (itemRaw)
                        itemRaw.style.height = e * k + 'px';
                });
            },
            shuffle() {
	            let j, temp;
	            for(let i = this.items.length - 1; i > 0; i--){
		            j = Math.floor(Math.random()*(i + 1));
		            temp = this.items[j];
		            this.items[j] = this.items[i];
		            this.items[i] = temp;
	            }
            },
            bubbleSort() {
                
                if (this.sorting)
                    return;

                this.bubbleLoading = true;

                let [result, animations] = bubbleSort(this.items.map(e => e));

                this.bubbleHaveResult = true;
                this.animate(animations, 0);
            },
            quickSort() {
                
                if (this.sorting)
                    return;

                this.quickLoading = true;

                let [result, animations] = quickSort(this.items.map(e => e));

                this.quickHaveResult = true;
                this.animate(animations, 0);
            },
            cocktailSort() {

                 if (this.sorting)
                    return;

                this.cocktailLoading = true;

                let [result, animations] = cocktailSort(this.items.map(e => e));

                this.cocktailHaveResult = true;
                this.animate(animations, 0);
            },
            animate(animations, animIndex) {
                
                if (!this.bubbleLoading && !this.quickLoading && !this.cocktailLoading) {
                    this.eraseVariables();
                    return;
                }

                let anim = animations[animIndex];

                if (compA > -1) this.setClassItem(compA, 'comp', true);
                if (compB > -1) this.setClassItem(compB, 'comp', true);

                if (swapA > -1) this.setClassItem(swapA, 'swap', true);
                if (swapB > -1) this.setClassItem(swapB, 'swap', true);

                [compA, compB] = anim.comp;
                this.setClassItem(compA, 'comp');
                this.setClassItem(compB, 'comp');

                if (anim.swap) 
                    this.arraySwapItem(anim.swap[0], anim.swap[1]);

                if (animIndex < animations.length - 1)
                    setTimeout(() => this.animate(animations, animIndex + 1), this.timerInterval);
                else {
                    this.eraseVariables();
                }
                    
            },
            eraseVariables() {

                this.bubbleLoading = false;
                this.quickLoading = false;
                this.cocktailLoading = false;

                if (compA > -1) this.setClassItem(compA, 'comp', true);
                if (compB > -1) this.setClassItem(compB, 'comp', true);

                if (swapA > -1) this.setClassItem(swapA, 'swap', true);
                if (swapB > -1) this.setClassItem(swapB, 'swap', true);

                [compA, compB] = [-1, -1];
                [swapA, swapB] = [-1, -1];
            },
            arraySwapItem(a, b) {

                [swapA, swapB] = [a, b];

                this.setClassItem(swapA, 'comp', true);
                this.setClassItem(swapB, 'comp', true);

                this.setClassItem(swapA, 'swap');
                this.setClassItem(swapB, 'swap');

                let itemA = document.getElementById('item_' + a);
                let itemB = document.getElementById('item_' + b);

                let tmp = itemA.style.height;
                itemA.style.height = itemB.style.height;
                itemB.style.height = tmp;
            },
            setClassItem(i, className, remove) {

                let item = document.getElementById('item_' + i);

                if (!item)
                    return 

                if (remove)
                    item.classList.remove(className);
                else
                    item.classList.add(className);
            }
        }
    }
</script>

<style lang="scss" scoped>
  
    .viz-container {
        min-height: 270px;
        display: flex;
        justify-content: center;
        padding: 10px;
    }

    .array-item {
        width: 5px;
        display: block;
        background: rgb(136, 175, 226);
        margin: 0 1px;
        align-self: flex-end;
        transition: height 0.25s;
    }

    .array-item.swap {
        background: rgb(179, 38, 38) !important;
    }
    
    .array-item.comp {
        background: rgb(45, 209, 108) !important;
    }

</style>