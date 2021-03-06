import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,ModalController,ViewController,Keyboard,AlertController,LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import {PreviewModal} from './preview';
import * as lodash from 'lodash';
/**i
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  results=this.getResults();
  keyword='rythm inside';
  http;
  _unfilteredResults=[];
  usesFilter=false;
  


  constructor(public navCtrl: NavController, public navParams: NavParams,httpService: Http,public actionSheetCtrl:ActionSheetController,public modalCtrl:ModalController,private keyboard:Keyboard,private alertCtrl:AlertController,private loadingCtrl:LoadingController) {
     this.http=httpService;
     this.actionSheetCtrl=actionSheetCtrl;


  }
  reloadData(refresher){


      console.log("Came to refresher");

      this.results=[];
      this.http.get('https://itunes.apple.com/search?term='+this.keyword).subscribe((response)=>{
              this.results = lodash.shuffle(response.json().results);
              refresher.complete();
          });
  }
  openPreview(track){


      console.log("Preview Opening  Started");

      let modal=this.modalCtrl.create(PreviewModal,{
          track:track
      });
      modal.present();

  }
  userPressedCancel(e){

  	console.log("User Pressed Cancel");
  	this.results = this.getResults();
  	this.keyword='';
  }

  keyHasBeenPressed(e){

  	//if(e.keyIdentifier==='Enter'){
  		// this.results  = this.getResults().filter((item)=>
  		// 	item.trackName.toLowerCase().includes(this.keyword.toLowerCase()));

  		
  	//}
      if(e.key==='Enter'){


          let loading = this.loadingCtrl.create({
              content:'Please wait....'
          })

          loading.present();
        
         // this.keyboard.close();
          this.http.get('https://itunes.apple.com/search?term='+this.keyword).subscribe((response)=>{
              

              this.results = response.json().results;
              if(!this.results.length){

                   let alert = this.alertCtrl.create({
                        title: 'I tunes Says...',
                        subTitle: 'No Results from ITunes',
                        buttons: ['Thats OK']
                  });
              alert.present();

              }
              this._unfilteredResults= this.results;
              this.usesFilter=false;
              loading.dismiss();
              
          });
          
      }

  }

  openFilters(){

      let sheet=this.actionSheetCtrl.create({
          title:'Filter by..',
          buttons:[
              {
                  text:'Movies only',
                  handler:()=>{

                      this.results=this._unfilteredResults.filter(
                          (item)=>item.kind==='feature-movie'
                          );
                      this.usesFilter=true;
                  }



              },
              {
                  text:'Songs only',
                  handler:()=>{

                      this.results=this._unfilteredResults.filter(
                          (item)=>item.kind==='song'
                          );
                      this.usesFilter=true;
                  }



              },
              {
                  text:'Clear',
                  role:'desctructive',
                  handler:()=>{
                      this.results = this._unfilteredResults;
                      this.usesFilter=false;
                  }


              },
              {
                  text:'Cancel',
                  role:'cancel'
              }

          ]
      })

      sheet.present();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getResults(){
  	return  [
      {
    "wrapperType": "track",
    "kind": "song",
    "artistId": 5869117,
    "collectionId": 459904774,
    "trackId": 459904911,
    "artistName": "Lil Wayne",
    "collectionName": "Tha Carter IV (Deluxe Edition)",
    "trackName": "John (feat. Rick Ross)",
    "collectionCensoredName": "Tha Carter IV (Deluxe Edition)",
    "trackCensoredName": "John (feat. Rick Ross)",
    "artistViewUrl": "https://itunes.apple.com/us/artist/lil-wayne/id5869117?uo=4",
    "collectionViewUrl": "https://itunes.apple.com/us/album/john-feat.-rick-ross/id459904774?i=459904911&uo=4",
    "trackViewUrl": "https://itunes.apple.com/us/album/john-feat.-rick-ross/id459904774?i=459904911&uo=4",
    "previewUrl": "http://a1557.phobos.apple.com/us/r1000/085/Music/de/c6/37/mzm.vjfeqrjw.aac.p.m4a",
    "artworkUrl30": "http://is4.mzstatic.com/image/thumb/Music/v4/c8/d2/f9/c8d2f98d-d2a8-35d0-fcd1-7adffc2560a9/source/30x30bb.jpg",
    "artworkUrl60": "http://is4.mzstatic.com/image/thumb/Music/v4/c8/d2/f9/c8d2f98d-d2a8-35d0-fcd1-7adffc2560a9/source/60x60bb.jpg",
    "artworkUrl100": "http://is4.mzstatic.com/image/thumb/Music/v4/c8/d2/f9/c8d2f98d-d2a8-35d0-fcd1-7adffc2560a9/source/100x100bb.jpg",
    "collectionPrice": 9.99,
    "trackPrice": 1.29,
    "releaseDate": "2011-08-29T07:00:00Z",
    "collectionExplicitness": "explicit",
    "trackExplicitness": "explicit",
    "discCount": 1,
    "discNumber": 1,
    "trackCount": 19,
    "trackNumber": 9,
    "trackTimeMillis": 286973,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Hip-Hop/Rap",
    "contentAdvisoryRating": "Explicit",
    "radioStationUrl": "https://itunes.apple.com/station/idra.459904911",
    "isStreamable": true
  },
  {
    "wrapperType": "track",
    "kind": "song",
    "artistId": 5869117,
    "collectionId": 459863725,
    "trackId": 459864020,
    "artistName": "Lil Wayne",
    "collectionName": "Tha Carter IV (Deluxe Edition)",
    "trackName": "John (feat. Rick Ross)",
    "collectionCensoredName": "Tha Carter IV (Deluxe Edition)",
    "trackCensoredName": "John (feat. Rick Ross)",
    "artistViewUrl": "https://itunes.apple.com/us/artist/lil-wayne/id5869117?uo=4",
    "collectionViewUrl": "https://itunes.apple.com/us/album/john-feat.-rick-ross/id459863725?i=459864020&uo=4",
    "trackViewUrl": "https://itunes.apple.com/us/album/john-feat.-rick-ross/id459863725?i=459864020&uo=4",
    "previewUrl": "http://a880.phobos.apple.com/us/r1000/075/Music/4c/96/77/mzm.zrjgcqjr.aac.p.m4a",
    "artworkUrl30": "http://is4.mzstatic.com/image/thumb/Music/v4/b7/d2/23/b7d22358-3e75-8708-7064-c6f8dd7ea94e/source/30x30bb.jpg",
    "artworkUrl60": "http://is4.mzstatic.com/image/thumb/Music/v4/b7/d2/23/b7d22358-3e75-8708-7064-c6f8dd7ea94e/source/60x60bb.jpg",
    "artworkUrl100": "http://is4.mzstatic.com/image/thumb/Music/v4/b7/d2/23/b7d22358-3e75-8708-7064-c6f8dd7ea94e/source/100x100bb.jpg",
    "collectionPrice": 11.99,
    "trackPrice": 1.29,
    "releaseDate": "2011-08-29T07:00:00Z",
    "collectionExplicitness": "cleaned",
    "trackExplicitness": "cleaned",
    "discCount": 1,
    "discNumber": 1,
    "trackCount": 19,
    "trackNumber": 9,
    "trackTimeMillis": 286973,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Hip-Hop/Rap",
    "contentAdvisoryRating": "Clean",
    "radioStationUrl": "https://itunes.apple.com/station/idra.459864020",
    "isStreamable": true
  },
  {
    "wrapperType": "track",
    "kind": "feature-movie",
    "trackId": 1012595477,
    "artistName": "Judd Apatow",
    "trackName": "Trainwreck",
    "trackCensoredName": "Trainwreck",
    "trackViewUrl": "https://itunes.apple.com/us/movie/trainwreck/id1012595477?uo=4",
    "previewUrl": "http://a1893.v.phobos.apple.com/us/r1000/130/Video49/v4/53/e9/89/53e989af-fcf0-f027-bdae-435b4faf116a/mzvf_1771259737429717318.640x352.h264lc.D2.p.m4v",
    "artworkUrl30": "http://is2.mzstatic.com/image/thumb/Video2/v4/d9/e9/eb/d9e9eb13-fc6d-ce52-c5f7-d8cc6d761225/source/30x30bb.jpg",
    "artworkUrl60": "http://is2.mzstatic.com/image/thumb/Video2/v4/d9/e9/eb/d9e9eb13-fc6d-ce52-c5f7-d8cc6d761225/source/60x60bb.jpg",
    "artworkUrl100": "http://is2.mzstatic.com/image/thumb/Video2/v4/d9/e9/eb/d9e9eb13-fc6d-ce52-c5f7-d8cc6d761225/source/100x100bb.jpg",
    "collectionPrice": 9.99,
    "trackPrice": 9.99,
    "trackRentalPrice": 4.99000,
    "collectionHdPrice": 9.99000,
    "trackHdPrice": 9.99000,
    "trackHdRentalPrice": 5.99000,
    "releaseDate": "2015-07-17T07:00:00Z",
    "collectionExplicitness": "notExplicit",
    "trackExplicitness": "notExplicit",
    "trackTimeMillis": 7509965,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Comedy",
    "contentAdvisoryRating": "R",
    "shortDescription": "From Judd Apatow, the guy who brought you Bridesmaids. Since she was a little girl, it’s been",
    "longDescription": "Since she was a little girl, Amy (Amy Schumer) has been taught that monogamy isn't realistic. Now a magazine writer, Amy lives by that credo, enjoying an uninhibited life free from stifling, boring romantic commitment. But when she finds herself starting to fall for the subject of a new article she's writing, a charming and successful sports doctor (Bill Hader), Amy starts to wonder if other grown-ups, including this guy who really seems to like her, might be onto something. From Judd Apatow (Bridesmaids, Superbad), Trainwreck is \"howlingly funny.\" (Rolling Stone)",
    "radioStationUrl": "https://itunes.apple.com/station/idra.1012595477"
  },
  {
    "wrapperType": "track",
    "kind": "feature-movie",
    "trackId": 928911988,
    "artistName": "Chad Stahelski​",
    "trackName": "John Wick",
    "trackCensoredName": "John Wick",
    "trackViewUrl": "https://itunes.apple.com/us/movie/john-wick/id928911988?uo=4",
    "previewUrl": "http://a746.v.phobos.apple.com/us/r1000/034/Video1/v4/99/c8/9d/99c89d69-f773-b55c-6c0c-71ded92d3358/mzvf_793390968524806465.640x350.h264lc.D2.p.m4v",
    "artworkUrl30": "http://is2.mzstatic.com/image/thumb/Video2/v4/3b/ea/a4/3beaa4a6-611c-cbc2-6718-fd2578abf363/source/30x30bb.jpg",
    "artworkUrl60": "http://is2.mzstatic.com/image/thumb/Video2/v4/3b/ea/a4/3beaa4a6-611c-cbc2-6718-fd2578abf363/source/60x60bb.jpg",
    "artworkUrl100": "http://is2.mzstatic.com/image/thumb/Video2/v4/3b/ea/a4/3beaa4a6-611c-cbc2-6718-fd2578abf363/source/100x100bb.jpg",
    "collectionPrice": 7.99,
    "trackPrice": 7.99,
    "collectionHdPrice": 7.99000,
    "trackHdPrice": 7.99000,
    "releaseDate": "2014-10-24T07:00:00Z",
    "collectionExplicitness": "notExplicit",
    "trackExplicitness": "notExplicit",
    "trackTimeMillis": 6072032,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Action & Adventure",
    "contentAdvisoryRating": "R",
    "shortDescription": "From the producer of CLASH OF THE TITANS and THE TOWN comes a tale of adrenaline-fueled revenge and",
    "longDescription": "When sadistic young thugs senselessly attack John Wick (Keanu Reeves)—a brilliantly lethal ex-assassin—they have no idea they've messed with the wrong guy. With New York City as his bullet-riddled playground, Wick embarks on a merciless rampage, hunting down his adversaries with the skill and ruthlessness that made him an underworld legend.",
    "radioStationUrl": "https://itunes.apple.com/station/idra.928911988"
  },
  {
    "wrapperType": "track",
    "kind": "song",
    "artistId": 549836,
    "collectionId": 1002042048,
    "trackId": 1002042054,
    "artistName": "Keith Urban",
    "collectionName": "John Cougar, John Deere, John 3:16 - Single",
    "trackName": "John Cougar, John Deere, John 3:16",
    "collectionCensoredName": "John Cougar, John Deere, John 3:16 - Single",
    "trackCensoredName": "John Cougar, John Deere, John 3:16",
    "artistViewUrl": "https://itunes.apple.com/us/artist/keith-urban/id549836?uo=4",
    "collectionViewUrl": "https://itunes.apple.com/us/album/john-cougar-john-deere-john/id1002042048?i=1002042054&uo=4",
    "trackViewUrl": "https://itunes.apple.com/us/album/john-cougar-john-deere-john/id1002042048?i=1002042054&uo=4",
    "previewUrl": "http://a68.phobos.apple.com/us/r1000/128/Music7/v4/d5/ba/b5/d5bab5eb-ca6b-56ee-9cb1-06ac14cb8553/mzaf_617656050030709759.plus.aac.p.m4a",
    "artworkUrl30": "http://is2.mzstatic.com/image/thumb/Music7/v4/76/5d/48/765d4801-049b-2756-c068-1ad0236220bb/source/30x30bb.jpg",
    "artworkUrl60": "http://is2.mzstatic.com/image/thumb/Music7/v4/76/5d/48/765d4801-049b-2756-c068-1ad0236220bb/source/60x60bb.jpg",
    "artworkUrl100": "http://is2.mzstatic.com/image/thumb/Music7/v4/76/5d/48/765d4801-049b-2756-c068-1ad0236220bb/source/100x100bb.jpg",
    "collectionPrice": 1.29,
    "trackPrice": 1.29,
    "releaseDate": "2015-06-09T07:00:00Z",
    "collectionExplicitness": "notExplicit",
    "trackExplicitness": "notExplicit",
    "discCount": 1,
    "discNumber": 1,
    "trackCount": 1,
    "trackNumber": 1,
    "trackTimeMillis": 221606,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Country",
    "radioStationUrl": "https://itunes.apple.com/station/idra.1002042054",
    "isStreamable": true
  },
  {
    "wrapperType": "track",
    "kind": "song",
    "artistId": 16586443,
    "collectionId": 679297685,
    "trackId": 679297849,
    "artistName": "John Legend",
    "collectionName": "Love in the Future (Deluxe Edition)",
    "trackName": "All of Me",
    "collectionCensoredName": "Love in the Future (Deluxe Edition)",
    "trackCensoredName": "All of Me",
    "artistViewUrl": "https://itunes.apple.com/us/artist/john-legend/id16586443?uo=4",
    "collectionViewUrl": "https://itunes.apple.com/us/album/all-of-me/id679297685?i=679297849&uo=4",
    "trackViewUrl": "https://itunes.apple.com/us/album/all-of-me/id679297685?i=679297849&uo=4",
    "previewUrl": "http://a355.phobos.apple.com/us/r1000/041/Music4/v4/90/cf/04/90cf0482-07c0-fca0-549f-c1ea62c4bdef/mzaf_6715619947923767616.plus.aac.p.m4a",
    "artworkUrl30": "http://is4.mzstatic.com/image/thumb/Music/v4/e1/86/1b/e1861b0b-f34e-752a-e9e3-8ecd624a22c1/source/30x30bb.jpg",
    "artworkUrl60": "http://is4.mzstatic.com/image/thumb/Music/v4/e1/86/1b/e1861b0b-f34e-752a-e9e3-8ecd624a22c1/source/60x60bb.jpg",
    "artworkUrl100": "http://is4.mzstatic.com/image/thumb/Music/v4/e1/86/1b/e1861b0b-f34e-752a-e9e3-8ecd624a22c1/source/100x100bb.jpg",
    "collectionPrice": 13.99,
    "trackPrice": 1.29,
    "releaseDate": "2013-08-30T07:00:00Z",
    "collectionExplicitness": "notExplicit",
    "trackExplicitness": "notExplicit",
    "discCount": 1,
    "discNumber": 1,
    "trackCount": 20,
    "trackNumber": 6,
    "trackTimeMillis": 269557,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "R&B/Soul",
    "radioStationUrl": "https://itunes.apple.com/station/idra.679297849",
    "isStreamable": true
  },
  {
    "wrapperType": "track",
    "kind": "feature-movie",
    "artistId": 81758682,
    "trackId": 668260266,
    "artistName": "Pixar",
    "trackName": "Monsters University",
    "trackCensoredName": "Monsters University",
    "artistViewUrl": "https://itunes.apple.com/us/studio/pixar/id81758682?uo=4",
    "trackViewUrl": "https://itunes.apple.com/us/movie/monsters-university/id668260266?uo=4",
    "previewUrl": "http://a1769.v.phobos.apple.com/us/r1000/030/Video6/v4/eb/b8/a5/ebb8a5da-d7ac-a9d5-34e0-863daa03aec5/mzvf_6653247605230241384.640x480.h264lc.D2.p.m4v",
    "artworkUrl30": "http://is2.mzstatic.com/image/thumb/Video6/v4/f3/76/66/f37666a4-ddeb-b035-bceb-b575e8ce4ae2/source/30x30bb.jpg",
    "artworkUrl60": "http://is2.mzstatic.com/image/thumb/Video6/v4/f3/76/66/f37666a4-ddeb-b035-bceb-b575e8ce4ae2/source/60x60bb.jpg",
    "artworkUrl100": "http://is2.mzstatic.com/image/thumb/Video6/v4/f3/76/66/f37666a4-ddeb-b035-bceb-b575e8ce4ae2/source/100x100bb.jpg",
    "collectionPrice": 14.99,
    "trackPrice": 14.99,
    "trackRentalPrice": 3.99000,
    "collectionHdPrice": 19.99000,
    "trackHdPrice": 19.99000,
    "trackHdRentalPrice": 4.99000,
    "releaseDate": "2013-06-21T07:00:00Z",
    "collectionExplicitness": "notExplicit",
    "trackExplicitness": "notExplicit",
    "trackTimeMillis": 6228983,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Kids & Family",
    "contentAdvisoryRating": "G",
    "shortDescription": "Disney•Pixar proudly presents the hilarious story of how two mismatched monsters met and became",
    "longDescription": "Disney•Pixar proudly presents the hilarious story of how two mismatched monsters met and became lifelong friends in a movie screaming with laughter and oozing with heart. Ever since college-bound Mike Wazowski (Billy Crystal) was a little monster, he’s dreamed of becoming a Scarer—and he knows better than anyone that the best Scarers come from Monsters University (MU). But during his first semester at MU, Mike’s plans are derailed when he crosses paths with hotshot James P. Sullivan, “Sulley” (John Goodman), a natural-born Scarer. The pair’s out-of-control competitive spirit gets them both kicked out of the University’s elite Scare Program. With their dreams temporarily dashed, they realize they will have to work together, along with an odd bunch of misfit monsters, if they ever hope to make things right.",
    "radioStationUrl": "https://itunes.apple.com/station/idra.668260266"
  },
  {
    "wrapperType": "track",
    "kind": "song",
    "artistId": 348580754,
    "collectionId": 929825574,
    "trackId": 929825619,
    "artistName": "Meghan Trainor",
    "collectionName": "Title (Deluxe)",
    "trackName": "Like I'm Gonna Lose You (feat. John Legend)",
    "collectionCensoredName": "Title (Deluxe)",
    "trackCensoredName": "Like I'm Gonna Lose You (feat. John Legend)",
    "artistViewUrl": "https://itunes.apple.com/us/artist/meghan-trainor/id348580754?uo=4",
    "collectionViewUrl": "https://itunes.apple.com/us/album/like-im-gonna-lose-you-feat./id929825574?i=929825619&uo=4",
    "trackViewUrl": "https://itunes.apple.com/us/album/like-im-gonna-lose-you-feat./id929825574?i=929825619&uo=4",
    "previewUrl": "http://a297.phobos.apple.com/us/r1000/046/Music5/v4/74/5f/01/745f0131-f9ed-5a08-e8f9-329027d23c7c/mzaf_6374116011802154052.plus.aac.p.m4a",
    "artworkUrl30": "http://is5.mzstatic.com/image/thumb/Music5/v4/41/7d/a2/417da2f7-b676-4dcb-8f41-8278a2501bf4/source/30x30bb.jpg",
    "artworkUrl60": "http://is5.mzstatic.com/image/thumb/Music5/v4/41/7d/a2/417da2f7-b676-4dcb-8f41-8278a2501bf4/source/60x60bb.jpg",
    "artworkUrl100": "http://is5.mzstatic.com/image/thumb/Music5/v4/41/7d/a2/417da2f7-b676-4dcb-8f41-8278a2501bf4/source/100x100bb.jpg",
    "collectionPrice": 12.99,
    "trackPrice": 1.29,
    "releaseDate": "2015-01-09T08:00:00Z",
    "collectionExplicitness": "notExplicit",
    "trackExplicitness": "notExplicit",
    "discCount": 1,
    "discNumber": 1,
    "trackCount": 15,
    "trackNumber": 6,
    "trackTimeMillis": 225635,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Pop",
    "radioStationUrl": "https://itunes.apple.com/station/idra.929825619",
    "isStreamable": true
  },
  {
    "wrapperType": "track",
    "kind": "song",
    "artistId": 5869117,
    "collectionId": 459854993,
    "trackId": 459855232,
    "artistName": "Lil Wayne",
    "collectionName": "Tha Carter IV",
    "trackName": "John (feat. Rick Ross)",
    "collectionCensoredName": "Tha Carter IV",
    "trackCensoredName": "John (feat. Rick Ross)",
    "artistViewUrl": "https://itunes.apple.com/us/artist/lil-wayne/id5869117?uo=4",
    "collectionViewUrl": "https://itunes.apple.com/us/album/john-feat.-rick-ross/id459854993?i=459855232&uo=4",
    "trackViewUrl": "https://itunes.apple.com/us/album/john-feat.-rick-ross/id459854993?i=459855232&uo=4",
    "previewUrl": "http://a1801.phobos.apple.com/us/r1000/090/Music/ea/78/3c/mzm.czpyuics.aac.p.m4a",
    "artworkUrl30": "http://is1.mzstatic.com/image/thumb/Music/v4/54/99/22/54992213-94a5-1478-5a54-f497699e6090/source/30x30bb.jpg",
    "artworkUrl60": "http://is1.mzstatic.com/image/thumb/Music/v4/54/99/22/54992213-94a5-1478-5a54-f497699e6090/source/60x60bb.jpg",
    "artworkUrl100": "http://is1.mzstatic.com/image/thumb/Music/v4/54/99/22/54992213-94a5-1478-5a54-f497699e6090/source/100x100bb.jpg",
    "collectionPrice": 9.99,
    "trackPrice": 1.29,
    "releaseDate": "2011-08-29T07:00:00Z",
    "collectionExplicitness": "explicit",
    "trackExplicitness": "explicit",
    "discCount": 1,
    "discNumber": 1,
    "trackCount": 15,
    "trackNumber": 9,
    "trackTimeMillis": 286973,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Hip-Hop/Rap",
    "contentAdvisoryRating": "Explicit",
    "radioStationUrl": "https://itunes.apple.com/station/idra.459855232",
    "isStreamable": true
  },
  {
    "wrapperType": "track",
    "kind": "feature-movie",
    "trackId": 508656568,
    "artistName": "Andrew Stanton",
    "trackName": "John Carter",
    "trackCensoredName": "John Carter",
    "trackViewUrl": "https://itunes.apple.com/us/movie/john-carter/id508656568?uo=4",
    "previewUrl": "http://a443.v.phobos.apple.com/us/r1000/135/Video3/v4/cb/8b/9f/cb8b9f44-0534-30db-fb54-2d661a2dfa03/mzvf_5351053216566795800.640x354.h264lc.D2.p.m4v",
    "artworkUrl30": "http://is2.mzstatic.com/image/thumb/Video4/v4/12/f7/51/12f7519a-3fd6-a53d-6a73-da83e22f28e2/source/30x30bb.jpg",
    "artworkUrl60": "http://is2.mzstatic.com/image/thumb/Video4/v4/12/f7/51/12f7519a-3fd6-a53d-6a73-da83e22f28e2/source/60x60bb.jpg",
    "artworkUrl100": "http://is2.mzstatic.com/image/thumb/Video4/v4/12/f7/51/12f7519a-3fd6-a53d-6a73-da83e22f28e2/source/100x100bb.jpg",
    "collectionPrice": 14.99,
    "trackPrice": 14.99,
    "trackRentalPrice": 2.99000,
    "collectionHdPrice": 19.99000,
    "trackHdPrice": 19.99000,
    "trackHdRentalPrice": 3.99000,
    "releaseDate": "2012-03-09T08:00:00Z",
    "collectionExplicitness": "notExplicit",
    "trackExplicitness": "notExplicit",
    "trackTimeMillis": 7971807,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Sci-Fi & Fantasy",
    "contentAdvisoryRating": "PG-13",
    "longDescription": "From Academy Award® - winning filmmaker Andrew Stanton (Best Animated Film, WALL-E, 2008) comes John Carter - a sweeping action-adventure set on the mysterious and exotic planet of Barsoom (Mars). Based on Edgar Rice Burroughs’ classic novel, John Carter is a war-weary, former military captain who’s inexplicably transported to Mars and reluctantly becomes embroiled in an epic conflict. It’s a world on the brink of collapse, and Carter rediscovers his humanity when he realizes the survival of Barsoom and its people rests in his hands. Stunning special effects, great characters and villains - John Carter is a heroic and inspirational adventure that will thrill you beyond imagination.",
    "radioStationUrl": "https://itunes.apple.com/station/idra.508656568"
  }]

  }

}


