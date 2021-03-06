'use strict';
const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector('#template-tag-link').innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector('#template-author-link').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  authorCloudLink: Handlebars.compile(
    document.querySelector('#template-author-cloud-link').innerHTML
  ),
};
function titleClickHandler(event) {
  const clickedElement = this;
  console.log('link was clicked!');
  event.preventDefault();
  /* [DONE]remove class 'active from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  console.log('activeLinks: ', activeLinks);

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /*[DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');
  console.log('active articles ', activeArticles);

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('article selector: ', articleSelector);
  /* find the correct article using the selector (value) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('target Article ', targetArticle);
  /* add class 'active to the correct article */
  console.log('clickedElement:', targetArticle);
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList', titleList);

  titleList.innerHTML = '';
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* for each article */
  /*add line from prework wykorzystanie selektora*/
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log('optArticleSelector: ', optArticleSelector);
  console.log('customSelector): ', customSelector);
  console.log('articles: ', articles);
  //let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector);
    console.log('articleTitle', articleTitle);

    /* get the title from the title element */
    const articleTitleContent = articleTitle.innerHTML;
    console.log('articleTitleContent: ', articleTitleContent);

    /* create HTML of the link */
    /*const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
      */
    const linkHTMLData = { id: articleId, title: articleTitleContent };
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log('linkHTML: ', linkHTML);

    /* insert link into titleList */
    console.log('titleList before for loop: ', titleList);

    /*for (let titleListElem of titleList) {*/
    //itleList.innerHTML = html;
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    console.log('titleList.innerHTML: ', titleList.innerHTML);
    //}
    /* insert link into html variable */
    //html = html + linkHTML;
    // console.log('html: ', html);
  }

  console.log('titleList: ', titleList);
  const links = document.querySelectorAll('.titles a');
  console.log('links: ', links);

  for (let link of links) {
    console.log('links loop');
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  console.log('tags params bleeeeh');
  for (let tag in tags) {
    console.log('tag params', tag);
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    console.log('params.max', params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles for tags: ', articles);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    console.log('article for tags:', article);
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log('tagWrapper:', tagWrapper);
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags: ', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray: ', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      console.log('tag: ', tag);
      /*const linkHTML =
        '<li><a href="#tag-' + tag + '">' + tag + '</a></li><span> </span>';
      console.log('linkHTML tag: ', linkHTML);*/
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('html with linkHTML: ', html);

      /* [NEW] check if this link is NOT already in allTags */
      // eslint-disable-next-line no-prototype-builtins
      if (!allTags.hasOwnProperty(tag) == 1) {
        /* [NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    console.log('allTags: ', allTags);
    /* insert HTML of all the links into the tags wrapper */
    console.log('hhtmlcheck:', html);
    tagWrapper.innerHTML = html;
    console.log('tagWrapper.innerHTML: ', tagWrapper.innerHTML);

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  console.log('tagList: ', tagList);
  console.log('allTags: ', allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', calculateTagsParams(allTags));

  /* [NEW] create variable for all links HTML code */
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags */
  for (let tag in allTags) {
    console.log('tag in allTags', tag);
    const tagLinkHTML =
      '<li> <a class="' +
      calculateTagClass(allTags[tag], tagsParams) +
      '" href="#tag-' +
      tag +
      '">' +
      tag +
      '</a></li>';
    console.log(
      'calculateTagClass: ',
      calculateTagClass(allTags[tag], tagsParams)
    );
    console.log('taglinkHTML', tagLinkHTML);
    // allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
    /*[NEW] END LOOP: for each tag in allTags*/
  }
  //console.log('allTagsHTML: ', allTagsHTML);
  /* [NEW] add html from allTagsHTML to taglist */
  // tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData', allTagsData);
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag from href: ', tag);

  /* find all tag links with class active */
  let activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTags: ', activeTags);

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constan */
  const sameTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log('SameTags: ', sameTags);

  /* START LOOP: for each found tag link */
  for (let sameTag of sameTags) {
    /* add class active */
    console.log('same tag loop', sameTag);
    sameTag.classList.add('active');
    console.log('sameTag: ', sameTag);

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument*/
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');
  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allTags with an empty array */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles for Authors: ', articles);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find  */
    console.log('article for Authors:', article);
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute('data-author');
    console.log('Author:', author);
    /* make html variable with empty string */
    let html = '';

    /* generate HTML of the link */
    console.log('author: ', author.innerText);
    // const linkHTML = '<a href="#author-' + author + '">' + author + '</a>';
    const linkHTMLData = { id: author, title: author };
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log('linkHTML author: ', linkHTML);
    //tagWrapper.insertAdjacentHTML('beforeend', linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log('author html with linkHTML: ', html);

    /* [NEW] check if this link is NOT already in allTags */
    // eslint-disable-next-line no-prototype-builtins
    if (!allAuthors.hasOwnProperty(author) == 1) {
      /* [NEW] add tag to allTags object*/
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    console.log('allAuthors: ', allAuthors);
    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html;
    console.log('authorWrapper.innerHTML: ', authorWrapper.innerHTML);

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const authorList = document.querySelector(optAuthorsListSelector);

  console.log('authorList: ', authorList);
  console.log('allAuthors: ', allAuthors);
  const tagsParams = calculateTagsParams(allAuthors);
  console.log('tagsParams:', calculateTagsParams(allAuthors));

  /* [NEW] create variable for all links HTML code */
  //let allAuthorsHTML = '';
  const allAuthorsData = { authors: [] };
  /* [NEW] START LOOP: for each tag in allTags */
  for (let author in allAuthors) {
    const authorLinkHTML =
      '<li> <a class="' +
      calculateTagClass(allAuthors[author], tagsParams) +
      '" href="#author-' +
      author +
      '">' +
      author +
      '</a></li>';
    //allAuthorsHTML += authorLinkHTML;
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateTagClass(allAuthors[author], tagsParams),
    });
    /*[NEW] END LOOP: for each tag in allTags*/
  }

  /* [NEW] add html from allTagsHTML to taglist */
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}
generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author from href: ', author);

  /* find all tag links with class active */
  let activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('activeTags: ', activeAuthors);

  /* START LOOP: for each active tag link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constan */
  const sameAuthors = document.querySelectorAll('[href="' + href + '"]');
  console.log('SameAuthors: ', sameAuthors);

  /* START LOOP: for each found tag link */
  for (let sameAuthor of sameAuthors) {
    /* add class active */
    console.log('same author loop', sameAuthor);
    sameAuthor.classList.add('active');
    console.log('sameAuthor: ', sameAuthor);

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument*/
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('[href^="#author-"]');
  console.log('dupaauthor', authorLinks);
  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
