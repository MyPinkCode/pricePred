$(function(){
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 300,
        labels: {
            next: "Continue",
            previous: "Back"
        },
        onStepChanging: function (event, currentIndex, newIndex) { 
            if ( newIndex >= 1 ) {
                $('.steps ul li:first-child a img').attr('src','../static/images/step-1.png');
            } else {
                $('.steps ul li:first-child a img').attr('src','../static/images/step-1-active.png');
            }

            if ( newIndex === 1 ) {
                $('.steps ul li:nth-child(2) a img').attr('src','../static/images/step-2-active.png');
            } else {
                $('.steps ul li:nth-child(2) a img').attr('src','../static/images/step-2.png');
            }

            if ( newIndex === 2 ) {
                $('.steps ul li:nth-child(3) a img').attr('src','../static/images/step-3-active.png');
            } else {
                $('.steps ul li:nth-child(3) a img').attr('src','../static/images/step-3.png');
            }

            if ( newIndex === 3 ) {
                $('.steps ul li:nth-child(4) a img').attr('src','../static/images/step-4-active.png');
                $('.actions ul').addClass('step-4');
            } else {
                $('.steps ul li:nth-child(4) a img').attr('src','../static/images/step-4.png');
                $('.actions ul').removeClass('step-4');
            }
            return true; 
        }
    });
    // Custom Button Jquery Steps
    $('.forward').click(function(){
    	$("#wizard").steps('next');
    })
    $('.backward').click(function(){
        $("#wizard").steps('previous');
    })
    // Click to see password 
    $('.password i').click(function(){
        if ( $('.password input').attr('type') === 'password' ) {
            $(this).next().attr('type', 'text');
        } else {
            $('.password input').attr('type', 'password');
        }
    }) 
    // Create Steps Image
    $('.steps ul li:first-child').append('<img src="../static/images/step-arrow.png" alt="" class="step-arrow">').find('a').append('<img  src="../static/images/step-1-active.png" alt=""> ').append('<span class="step-order">Neural network</span>');
    $('.steps ul li:nth-child(2').append('<img src="../static/images/step-arrow.png" alt="" class="step-arrow">').find('a').append('<img  src="../static/images/step-2.png" alt="">').append('<span class="step-order">K-Nearst Neighbors</span>');
    $('.steps ul li:nth-child(3)').append('<img src="../static/images/step-arrow.png" alt="" class="step-arrow">').find('a').append('<img  src="../static/images/step-3.png" alt="">').append('<span class="step-order">Naive Bayes</span>');
    $('.steps ul li:last-child a').append('<img src="../static/images/step-4.png" alt="">').append('<span class="step-order">Home</span>');
    // Count input 
    $(".quantity span").on("click", function() {

        var $button = $(this);
        var oldValue = $button.parent().find("input").val();

        if ($button.hasClass('plus')) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
           // Don't allow decrementing below zero
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
            } else {
            newVal = 0;
          }
        }
        $button.parent().find("input").val(newVal);
    });

    $( document ).ready(function() {
        let neural = document.getElementById('neuralNetwork');
        let bayes = document.getElementById('naiveBayes');
        let neighbors = document.getElementById('nearstNeighbors');
        

        neural.addEventListener('click', async(e) => {
            name1 = document.getElementById('name1').value;
            rating1 = document.getElementById('rating1').value;
            review1 = document.getElementById('review1').value;
            brand1 = document.getElementById('brand1').value;
            area1 = document.getElementById('area1').value;

            if( name1.length > 0 && rating1.length > 0 && review1.length > 0 && brand1.length > 0 && area1.length > 0 ){
                console.log({name: name1, rating: rating1, review: review1, brand: brand1, area: area1});
                let res = await axios({
                    method: 'post',
                    url: 'http://localhost:5000/neural_network',
                    data: {name: name1, rating: rating1, review: review1, brand: brand1, area: area1}
                });

                console.log(res.data);

                document.getElementById('predict1').innerHTML = parseFloat(res.data.predict) > 0 ? 'Price is under 50$' : 'Price is equel or upper 50$'
                document.getElementById('score1').innerHTML = res.data.score+"%" 
            }

        })

        neighbors.addEventListener('click', async(e) => {
            
            name2 = document.getElementById('name2').value;
            rating2 = document.getElementById('rating2').value;
            review2 = document.getElementById('review2').value;
            brand2 = document.getElementById('brand2').value;
            area2 = document.getElementById('area2').value;

            if( name2.length > 0 && rating2.length > 0 && review2.length > 0 && brand2.length > 0 && area2.length > 0 ){
                console.log({name: name2, rating: rating2, review: review2, brand: brand2, area: area2});
                let res = await axios({
                    method: 'post',
                    url: 'http://localhost:5000/nearst_neighbors',
                    data: {name: name2, rating: rating2, review: review2, brand: brand2, area: area2}
                });

                console.log(res.data);

                document.getElementById('predict2').innerHTML = parseFloat(res.data.predict) > 0 ? 'Price is under 50$' : 'Price is equel or upper 50$'
                document.getElementById('score2').innerHTML = res.data.score+"%" 
            }

        })

        bayes.addEventListener('click', async(e) => {
            
            name3 = document.getElementById('name3').value;
            rating3 = document.getElementById('rating3').value;
            review3 = document.getElementById('review3').value;
            brand3 = document.getElementById('brand3').value;
            area3 = document.getElementById('area3').value;

            if( name3.length > 0 && rating3.length > 0 && review3.length > 0 && brand3.length > 0 && area3.length > 0 ){
                console.log({name: name3, rating: rating3, review: review3, brand: brand3, area: area3});
                let res = await axios({
                    method: 'post',
                    url: 'http://localhost:5000/naive_bayes',
                    data: {name: name3, rating: rating3, review: review3, brand: brand3, area: area3}
                });

                console.log(res.data);

                document.getElementById('predict3').innerHTML = parseFloat(res.data.predict) > 0 ? 'Price is under 50$' : 'Price is equel or upper 50$'
                document.getElementById('score3').innerHTML = res.data.score+"%" 
            }

        })

    });
})
