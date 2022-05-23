'use strict';

function titleClickHandler(event) {
  const clickedElement = this;
  console.log('link was clicked!');
  console.log(event);
  event.preventDefault();
  /* [DONE]remove class 'active from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /*[DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post article.active');

  for (let activeArticle of activeArticles) {
    //activeArticle.classList.remove('active');
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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.list .tags',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* for each article */
  /*add line from prework wykorzystanie selektora*/
  const articles = document.querySelectorAll(
    optArticleSelector,
    customSelector
  );
  console.log(optArticleSelector);
  console.log(customSelector);
  console.log(articles);
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector);

    /* get the title from the title element */
    console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span></span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('afterend', linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;
  console.log(titleList);
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { min: 0, max: 999999 };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
}
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  optCloudClassPrefix.insertAdjacentHTML('afterend', classNumber);
}
function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      console.log(tag);
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);
      titleList.insertAdjacentHTML('afterend', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(linkHTML) == 1) {
        /* [NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    console.log(titleList);

    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags */
    for (let tag in allTags) {
      const tagLinkHTML =
        '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
      console.log('taglinkHTML', tagLinkHTML);
      allTagsHTML += tagLinkHTML;
    }

    /*[NEW] END LOOP: for each tag in allTags*/

    /* [NEW] add html from allTagsHTML to taglist */
    tagList.innerHTML = allTagsHTML;
  }
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of " */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clic */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  let activeTags = href.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constan */
  let SameTags = href.querySelectorAll('a[href="' + href + '"]');
  console.log(SameTags);

  /* START LOOP: for each found tag link */
  for (let sameTag of sameTags) {
    /* add class active */
    sameTag.classlist.add('active');
    console.log(sameTag);

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument*/
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}
addClickListenersToTags();

function generateAuthors() {
  /* find all articles */
  const authors = document.querySelectorAll(optArticleAuthorSelector);
  console.log(authors);

  /* START LOOP: for every article: */
  for (let author of authors) {
    /* find tags wrapper */
    const authorList = author.querySelector(optArticleAuthorSelector);
    console.log(authorList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleAuthor = author.getAttribute('post-author');
    console.log(articleAuthor);

    /* generate HTML of the link */
    console.log(author);
    const linkHTML =
      '<li><a href="#tag-' + author + '">' + author + '</a></li>';
    console.log(linkHTML);
    authorList.insertAdjacentHTML('afterend', linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log(html);

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML = html;
    console.log(authorList);

    /* END LOOP: for every article: */
  }
}
generateAuthors();

function AuthorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of " */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clic */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  let activeTags = href.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constan */
  let SameTags = href.querySelectorAll('a[href="' + href + '"]');
  console.log(SameTags);

  /* START LOOP: for each found tag link */
  for (let sameTag of sameTags) {
    /* add class active */
    sameTag.classlist.add('active');
    console.log(sameTag);

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument*/
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToAuthors() {
  /* find all links to tags */
  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}
addClickListenersToAuthors();
