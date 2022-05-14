'use strict';

function titleClickHandler(event){
  const clickedElement = this;
  console.log('link was clicked!');
  console.log(event);
  event.preventDefault();
  /* [DONE]remove class 'active from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}
  /*[DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  /* find the correct article using the selector (value) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* add class 'active to the correct article */
  console.log('clickedElement:', targetArticle);
  targetArticle.classList.add('active');
}



const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles';
function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';
  const activeLinks = document.querySelectorAll('.titles a.active');

  
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for(let article of articles)
  {
 
  /* get the article id */ 
  const articleId = article.getAttribute('id');
  /* find the title element */
  const articleTitle = article.querySelector(optTitleSelector)
  /* get the title from the title element */
  console.log(articleTitle);
  /* create HTML of the link */
  const linkHTML = '<li><a href="#'+ articleId +'"><span></span></a></li>';
  console.log(linkHTML);
  /* insert link into titleList */
  titleList.insertAdjacentHTML('afterend', linkHTML);
  /* insert link into html variable */
  html = html + linkHTML;
  console.log(html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click',titleClickHandler);
  }

}
generateTitleLinks();
