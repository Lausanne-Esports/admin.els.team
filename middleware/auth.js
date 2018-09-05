export default ({ store, redirect }) => {
  if (store.state.currentUser === null) {
    return redirect('/login')
  }
}
