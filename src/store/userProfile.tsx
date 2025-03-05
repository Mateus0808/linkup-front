import { PostResponse } from '@/types/post.type';
import { UserPost } from '@/types/user.type';
import { create } from 'zustand';

interface CommentType {
  id: string;
  description: string;
  postId: string;
  user: UserPost;
  createdAt: string;
  updatedAt: string;
}

interface PostState {
  posts: PostResponse[];
  setPosts: (posts: PostResponse[]) => void;
  updatePost: (postId: string, updatedPost: PostResponse) => void;
  addComment: (postId: string, comment: CommentType) => void;
  deleteComment: (postId: string, commentId: string) => void;
  toggleLike: (postId: string, userId: string) => void;
  deletePost: (postId: string) => void;
}

export const useProfileStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),

  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [comment, ...post.comments] }
          : post
      ),
    })),

  updatePost: (postId, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      ),
    })),

  deleteComment: (postId, commentId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((comment) => comment.id !== commentId),
            }
          : post
      ),
    })),

  toggleLike: (postId, userId) =>
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes.includes(userId)
                  ? post.likes.filter((id) => id !== userId)
                  : [...post.likes, userId],
              }
            : post
        ),
      })),
  
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
}))