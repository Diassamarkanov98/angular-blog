import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/post.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  posts: Post[] = []
  pSub: Subscription
  dSub: Subscription
  searchStr = ''



  constructor(
    private postsService: PostsService,
    private alert: AlertService
    ) { }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string){
    this.postsService.remove(id).subscribe(()=>{
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('Пост был удален')
    })
  }

  ngOnDestroy() {
    if(this.pSub){
      this.pSub.unsubscribe()
    }

    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }
}
