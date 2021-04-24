const galleryEl = document.getElementById('gallery-container');

const imageUrls = [
    'https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg',
    'https://i.pinimg.com/originals/8d/ec/f9/8decf9caed777b8d0d698e01270ce308.png',
    'https://i.ytimg.com/vi/x1T9w4VbdyM/maxresdefault.jpg',
    'https://tunglocpet.com/wp-content/uploads/2017/10/cho-corgi-pembroke-tunglocpet-01.jpg',
    'https://images2.minutemediacdn.com/image/upload/c_crop,h_1682,w_3000,x_0,y_70/v1554920074/shape/mentalfloss/63578-istock-173312739.jpg?itok=eYo60BeX',
    'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=1200',
    'https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0',
    'https://vtv1.mediacdn.vn/thumb_w/650/2019/5/25/jpg-1558750038561212299356.jpg',
    'https://jooinn.com/images/cute-dog-20.jpg',
    'https://i1.wp.com/www.bamato.vn/wp-content/uploads/2018/09/Essence-Of-Red-Kangaroo-7.jpg?resize=620%2C387&ssl=1',
    'https://petmaster.vn/petroom/wp-content/uploads/2020/03/doi-mat-cho-husky.jpg',
    'http://imgs.vietnamnet.vn/Images/2012/05/08/11/20120508110847_2.JPG',
    'https://kenh14cdn.com/2017/b8f677570e6edb5aabd5d75ddf563e05-1492355656735.jpg',
    'https://thumbs-prod.si-cdn.com/ej9KRK9frB5AXD6W9LXKFnuRc-0=/fit-in/1600x0/https://public-media.si-cdn.com/filer/ad/7b/ad7b3860-ad5f-43dc-800e-af57830cd1d3/labrador.jpg',
];
for (let url of imageUrls) {
    galleryEl.innerHTML += `
        <div class='galery-item'>
        <div class='fade'><i class="fas fa-heart"></i></div>
        <div class='dark-overlay'></div>
        <img src="${url}"/>
        </div>
    `
}