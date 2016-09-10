/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

    // Your custom JavaScript goes here
    var app = {
        pageTitle: document.getElementById('page-title')
    };

    // Change tab
    document.getElementById("header-tab-menu").addEventListener("click", function(e) {
        var title = document.getElementById("header-tab-menu")
            .getElementsByClassName("is-active")[0]
            .getElementsByTagName("span")[0]
            .innerHTML;
        app.pageTitle.innerHTML = title;

        if (title === "Jelajah") {
            document.getElementById("create-explore").removeAttribute("hidden");
        } else {
            document.getElementById("create-explore").setAttribute("hidden", "");
        }

        if (title === "Lapor") {
            document.getElementById("create-report").removeAttribute("hidden");

            var dialog = document.querySelector('#donation-dialog');
            var showDialogButton = document.querySelector('.give-donation');
            if (! dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }
            showDialogButton.addEventListener('click', function() {
                dialog.showModal();
            });
            dialog.querySelector('.close').addEventListener('click', function() {
                dialog.close();
            });
            var dialog2 = document.querySelector("#donation-confirmation-dialog");
            var showDialogButton2 = document.querySelector('.show-donation-confirmation-dialog');
            if (! dialog2.showModal) {
                dialogPolyfill.registerDialog(dialog2);
            }
            showDialogButton2.addEventListener('click', function() {
                dialog.close();
                dialog2.showModal();
            });
            dialog2.querySelector('.close').addEventListener('click', function() {
                dialog2.close();
            });
        } else {
            document.getElementById("create-report").setAttribute("hidden", "");
        }
    })

    var detailBtn = [].slice.call(document.getElementsByClassName("show-report-detail"));
    detailBtn.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            var card = e.target.parentNode.parentNode;
            var detailText = card.getElementsByClassName("mdl-card__supporting-text")[0];
            // console.log(card);
            if (detailText.hasAttribute("hidden")) {
                detailText.removeAttribute("hidden");
                e.target.innerHTML = "Tutup";
            } else {
                detailText.setAttribute("hidden", "true");
                e.target.innerHTML = "Detail";
            }
        });
    });

    // Vote report to goverment
    document.getElementsByClassName("vote-report")[0].addEventListener("click", function(e) {
        e.target.setAttribute("disabled", "");
        var numVote = e.target.parentNode.getElementsByTagName("span")[0];
        numVote.innerHTML = parseInt(numVote.innerHTML) + 1;
    });

})();
var jelajahMap;
var locationList = [
    ["Mall", {lat: -6.2531528, lng: 106.6156402}, "/detail-taman.html"],
    ["Taman Umum", {lat: -6.253555, lng: 106.622403}, "/detail-taman.html"],
    ["Pasar Tradisional", {lat: -6.262183, lng: 106.617391}, "/detail-taman"]
];

function initMap() {
    jelajahMap = new google.maps.Map(document.getElementById('explore-map'), {
        center: {lat: -6.2568704, lng: 106.6177493},
        zoom: 15
    });

    locationList.forEach(function(loc) {
        var marker = new google.maps.Marker({
            title: loc[0],
            position: loc[1],
            map: jelajahMap,
            url: loc[2]
        });
        google.maps.event.addListener(marker, 'click', function() {
            window.location.href = this.url;
        });
    });
    var pageHeight = document.querySelector('.mdl-layout__content').getAttribute('height');
    console.log(document.querySelector('.mdl-layout__content'));
    document.getElementById('explore-map').setAttribute("height", pageHeight);
}
