let SessionLoad = 1
if &cp | set nocp | endif
let s:cpo_save=&cpo
set cpo&vim
noremap! <Plug>CCMCCM :
map! <S-Insert> *
inoremap <S-Tab> 
imap <silent> <Plug>IMAP_JumpBack =IMAP_Jumpfunc('b', 0)
imap <silent> <Plug>IMAP_JumpForward =IMAP_Jumpfunc('', 0)
noremap! <Plug>CCMCR 
noremap! <Plug>CCMBS <BS>
noremap! <Plug>CCMEsc 
noremap! <Plug>CCMC-O 
noremap! <Plug>CCMC-R 
noremap! <Plug>CCMC-C 
noremap! <Plug>CCMC-U 
vmap <NL> <Plug>IMAP_JumpForward
nmap <NL> <Plug>IMAP_JumpForward
vmap  :call Toggle()
nmap  :call Toggle()
nmap o <Plug>ZoomWin
map  a
nmap ,cj :em CVS.Join\ in\ 
nmap ,cp :em CVS.Import\ 
nmap ,ci :em CVS.Commit\ 
nmap ,ca :em CVS.Add\ 
nmap ,cv :em CVS.Revert\ changes\ 
nmap ,cu :em CVS.Update\ 
nmap ,cq :em CVS.Query\ update\ 
nmap ,co :em CVS.Checkout\ 
nmap ,cc :em CVS.Local\ status\ 
nmap ,ch :em CVS.Short\ status\ 
nmap ,cs :em CVS.Status\ 
nmap ,cl :em CVS.Log\ 
nmap ,cr :em CVS.History\ 
nmap ,cn :em CVS.Annotate\ 
nmap ,cd :em CVS.Diff\ 
nmap ,cwu :em CVS.Watch/Edit\ .Unedit\ 
nmap ,cwt :em CVS.Watch/Edit\ .Edit\ 
nmap ,cwe :em CVS.Watch/Edit\ .Editors\ 
nmap ,cwf :em CVS.Watch/Edit\ .Watch\ off\ 
nmap ,cwn :em CVS.Watch/Edit\ .Watch\ on\ 
nmap ,cwr :em CVS.Watch/Edit\ .Watch\ remove\ 
nmap ,cwa :em CVS.Watch/Edit\ .Watch\ add\ 
nmap ,cww :em CVS.Watch/Edit\ .Watchers\ 
nmap ,cth :em CVS.Tag\ .Create\ branch\ by\ module\ 
nmap ,cto :em CVS.Tag\ .Remove\ tag\ by\ module\ 
nmap ,cta :em CVS.Tag\ .Create\ tag\ by\ module\ 
nmap ,ctb :em CVS.Tag\ .Create\ branch\ 
nmap ,ctr :em CVS.Tag\ .Remove\ tag\ 
nmap ,ctc :em CVS.Tag\ .Create\ tag\ 
nmap ,cel :em CVS.Delete\ .Release\ workdir\ 
nmap ,cem :em CVS.Delete\ .Remove\ from\ repository\ 
nmap ,cmo :em CVS.Admin\ .Logout\ 
nmap ,cmi :em CVS.Admin\ .Login\ 
nmap ,cxw :em CVS.Extra\ .Get\ file\ (password)\ 
nmap ,cxg :em CVS.Extra\ .Get\ file\ 
nmap ,cxk :em CVS.Extra\ .CVS\ links\ 
nmap ,cxj :em CVS.Extra\ .Join\ in\ to\ revision\ 
nmap ,cxp :em CVS.Extra\ .Import\ to\ revision\ 
nmap ,cxi :em CVS.Extra\ .Commit\ to\ revision\ 
nmap ,cxf :em CVS.Extra\ .Merge\ in\ revision\ diffs\ 
nmap ,cxm :em CVS.Extra\ .Merge\ in\ revision\ 
nmap ,cxu :em CVS.Extra\ .Update\ to\ revision\ 
nmap ,cxo :em CVS.Extra\ .Checkout\ revision\ 
nmap ,cxl :em CVS.Extra\ .Log\ to\ revision\ 
nmap ,cxd :em CVS.Extra\ .Diff\ to\ revision\ 
nmap ,cxcu :em CVS.Extra\ .Create\ patchfile\ .Uni\ 
nmap ,cxcs :em CVS.Extra\ .Create\ patchfile\ .Standard\ 
nmap ,cxcc :em CVS.Extra\ .Create\ patchfile\ .Context\ 
nmap ,cym :em CVS.Directory\ .Remove\ from\ repositoy\ 
nmap ,cyi :em CVS.Directory\ .Commit\ 
nmap ,cya :em CVS.Directory\ .Add\ 
nmap ,cyu :em CVS.Directory\ .Update\ 
nmap ,cyq :em CVS.Directory\ .Query\ update\ 
nmap ,cyc :em CVS.Directory\ .Local\ status\ 
nmap ,cyh :em CVS.Directory\ .Short\ status\ 
nmap ,cys :em CVS.Directory\ .Status\ 
nmap ,cyl :em CVS.Directory\ .Log\ 
nmap ,ckt :em CVS.Keyword\ .State\ 
nmap ,cks :em CVS.Keyword\ .Source\ 
nmap ,ckr :em CVS.Keyword\ .Revision\ 
nmap ,ckf :em CVS.Keyword\ .RCSfile\ 
nmap ,ckl :em CVS.Keyword\ .Log\ 
nmap ,ckk :em CVS.Keyword\ .Locker\ 
nmap ,ckn :em CVS.Keyword\ .Name\ 
nmap ,cki :em CVS.Keyword\ .Id\ 
nmap ,ckh :em CVS.Keyword\ .Header\ 
nmap ,ckd :em CVS.Keyword\ .Date\ 
nmap ,cka :em CVS.Keyword\ .Author\ 
nmap ,cgip :em CVS.Settings\ .Install\ .Install\ buffer\ as\ plugin\ 
nmap ,cgih :em CVS.Settings\ .Install\ .Install\ buffer\ as\ help\ 
nmap ,cgid :em CVS.Settings\ .Install\ .Download\ updates\ 
nmap ,cgii :em CVS.Settings\ .Install\ .Install\ updates\ 
nmap ,cgou :em CVS.Settings\ .Output\ .Unsorted\ 
nmap ,cgos :em CVS.Settings\ .Output\ .Sorted\ 
nmap ,cgof :em CVS.Settings\ .Output\ .Full\ 
nmap ,cgoc :em CVS.Settings\ .Output\ .Compressed\ 
nmap ,cgoa :em CVS.Settings\ .Output\ .Autoswitch\ 
nmap ,cgon :em CVS.Settings\ .Output\ .Notify\ only\ 
nmap ,cgob :em CVS.Settings\ .Output\ .To\ new\ buffer\ 
nmap ,cgoob :em CVS.Settings\ .Output\ .Notifcation.Disable\ titlebar\ 
nmap ,cgoot :em CVS.Settings\ .Output\ .Notifcation.Enable\ titlebar\ 
nmap ,cgool :em CVS.Settings\ .Output\ .Notifcation.Disable\ statusline\ 
nmap ,cgoos :em CVS.Settings\ .Output\ .Notifcation.Enable\ statusline\ 
nmap ,cgqh :em CVS.Settings\ .Revision\ queries\ .Hide\ current\ rev\ 
nmap ,cgqo :em CVS.Settings\ .Revision\ queries\ .Offer\ current\ rev\ 
nmap ,cgqd :em CVS.Settings\ .Revision\ queries\ .Disable\ 
nmap ,cgqe :em CVS.Settings\ .Revision\ queries\ .Enable\ 
nmap ,cgds :em CVS.Settings\ .Diff\ .Restore\ pre-diff\ mode\ 
nmap ,cgdn :em CVS.Settings\ .Diff\ .No\ autorestore\ 
nmap ,cgda :em CVS.Settings\ .Diff\ .Autorestore\ prev\.mode\ 
nmap ,cgdd :em CVS.Settings\ .Diff\ .Switch\ to\ diffed\ 
nmap ,cgdo :em CVS.Settings\ .Diff\ .Stay\ in\ original\ 
nmap ,cgtd :em CVS.Settings\ .Target\ .Directory\ 
nmap ,cgtb :em CVS.Settings\ .Target\ .File\ in\ buffer\ 
nmap ,cgad :em CVS.Settings\ .Autocheck\ .Disable\ 
nmap ,cgae :em CVS.Settings\ .Autocheck\ .Enable\ 
nmap ,cgm :em CVS.Settings\ .Show\ mappings\ 
nmap ,cgf :em CVS.Settings\ .Info\ (buffer)\ 
nmap ,cf :em CVS.Info\ 
vnoremap / :call SearchCompleteStart()/
onoremap / :call SearchCompleteStart()/
map Q gq
vmap [% [%m'gv``
nmap \gs :echo 'URL=' Thlnk_getCurResource()
nmap \gc :call Thlnk_viewResourceMap()
vmap \gr :call Thlnk_goUrlVis('read')
vmap \gE :call Thlnk_goUrlVis('split')
vmap \gV :call Thlnk_goUrlVis('sview')
vmap \gu :call Thlnk_goUrlVis('edit')
vmap \ge :call Thlnk_goUrlVis('edit')
vmap \gv :call Thlnk_goUrlVis('view')
nmap \gr :call Thlnk_goUrl('read')
nmap \gE :call Thlnk_goUrl('split')
nmap \gV :call Thlnk_goUrl('sview')
nmap \gu :call Thlnk_goUrl('edit')
nmap \ge :call Thlnk_goUrl('edit')
nmap \gv :call Thlnk_goUrl('view')
nmap \sv <Plug>SVNVimDiff
nmap \su <Plug>SVNUpdate
nmap \si <Plug>SVNInfo
nmap \ss <Plug>SVNStatus
nmap \sr <Plug>SVNReview
nmap \sq <Plug>SVNRevert
nmap \sl <Plug>SVNLog
nmap \sg <Plug>SVNGotoOriginal
nmap \sd <Plug>SVNDiff
nmap \sc <Plug>SVNCommit
nmap \sG <Plug>SVNClearAndGotoOriginal
nmap \sn <Plug>SVNAnnotate
nmap \sa <Plug>SVNAdd
map <silent> \mm :ShowMarksPlaceMark
map <silent> \ma :ShowMarksClearAll
map <silent> \mh :ShowMarksClearMark
map <silent> \mo :ShowMarksOn
map <silent> \mt :ShowMarksToggle
nmap <silent> \ups :call Perl_RemoveGuiMenus()
nmap <silent> \lps :call Perl_CreateGuiMenus()
map \mbt <Plug>TMiniBufExplorer
map \mbu <Plug>UMiniBufExplorer
map \mbc <Plug>CMiniBufExplorer
map \mbe <Plug>MiniBufExplorer
nnoremap <silent> \gwin :GWindow
nmap \es :call ES_PlaceSigns()
nmap \sh <Plug>DBHistory
nmap \slv <Plug>DBListView
nmap \slp <Plug>DBListProcedure
nmap \slt <Plug>DBListTable
vmap <silent> \slc :exec 'DBListColumn '.DB_getVisualBlock()
nmap \slc <Plug>DBListColumn
nmap \sbp <Plug>DBPromptForBufferParameters
nmap \sdpa <Plug>DBDescribeProcedureAskName
vmap <silent> \sdp :exec 'DBDescribeProcedure '.DB_getVisualBlock()
nmap \sdp <Plug>DBDescribeProcedure
nmap \sdta <Plug>DBDescribeTableAskName
vmap <silent> \sdt :exec 'DBDescribeTable '.DB_getVisualBlock()
nmap \sdt <Plug>DBDescribeTable
nmap \sta <Plug>DBSelectFromTableAskName
nmap \stw <Plug>DBSelectFromTableWithWhere
vmap <silent> \st :exec 'DBSelectFromTable '.DB_getVisualBlock()
nmap \st <Plug>DBSelectFromTable
nmap <silent> \sel :.,.DBExecRangeSQL
nmap <silent> \sea :1,$DBExecRangeSQL
nmap \se <Plug>DBExecSQLUnderCursor
vmap \se <Plug>DBExecVisualSQL
nmap \cwr <Plug>CVSWatchRemove
nmap \cwf <Plug>CVSWatchOff
nmap \cwn <Plug>CVSWatchOn
nmap \cwa <Plug>CVSWatchAdd
nmap \cwv <Plug>CVSWatchers
nmap \cv <Plug>CVSVimDiff
nmap \cu <Plug>CVSUpdate
nmap \ct <Plug>CVSUnedit
nmap \cs <Plug>CVSStatus
nmap \cr <Plug>CVSReview
nmap \cq <Plug>CVSRevert
nmap \cl <Plug>CVSLog
nmap \cg <Plug>CVSGotoOriginal
nmap \ci <Plug>CVSEditors
nmap \ce <Plug>CVSEdit
nmap \cd <Plug>CVSDiff
nmap \cc <Plug>CVSCommit
nmap \cG <Plug>CVSClearAndGotoOriginal
nmap \cn <Plug>CVSAnnotate
nmap \ca <Plug>CVSAdd
map \c <Plug>toggle
map \rwp <Plug>RestoreWinPosn
map \swp <Plug>SaveWinPosn
nmap \ihn :IHN
nmap \is :IHS:A
nmap \ih :IHS
vmap <silent> \Htd :<BS><BS><BS>ma'>\Htd
vmap <silent> \tt :<BS><BS><BS>ma'>\tt
vmap <silent> \tp@ :<BS><BS><BS>ma'>\tp@
vmap <silent> \tsq :<BS><BS><BS>ma'>\tsq
vmap <silent> \tsp :<BS><BS><BS>ma'>\tsp
vmap <silent> \tml :<BS><BS><BS>ma'>\tml
vmap <silent> \tab :<BS><BS><BS>ma'>\tab
vmap <silent> \t@ :<BS><BS><BS>ma'>\t@
vmap <silent> \t? :<BS><BS><BS>ma'>\t?
vmap <silent> \t= :<BS><BS><BS>ma'>\t=
vmap <silent> \t< :<BS><BS><BS>ma'>\t<
vmap <silent> \t; :<BS><BS><BS>ma'>\t;
vmap <silent> \t: :<BS><BS><BS>ma'>\t:
vmap <silent> \ts, :<BS><BS><BS>ma'>\ts,
vmap <silent> \t, :<BS><BS><BS>ma'>\t,
vmap <silent> \t| :<BS><BS><BS>ma'>\t|
vmap <silent> \anum :B s/\(\d\)\s\+\(-\=[.,]\=\d\)/\1@\2/ge:AlignCtrl mp0P0gv:Align [.,@]:'<,'>s/\([-0-9.,]*\)\(\s\+\)\([.,]\)/\2\1\3/ge:'<,'>s/@/ /ge
vmap <silent> \afnc :<BS><BS><BS>ma'>\afnc
vmap <silent> \adef :<BS><BS><BS>ma'>\adef
vmap <silent> \adec :<BS><BS><BS>ma'>\adec
vmap <silent> \ascom :<BS><BS><BS>ma'>\ascom
vmap <silent> \aocom :<BS><BS><BS>ma'>\aocom
vmap <silent> \acom :<BS><BS><BS>ma'>\acom
vmap <silent> \abox :<BS><BS><BS>ma'>\abox
vmap <silent> \a= :<BS><BS><BS>ma'>\a=
vmap <silent> \a< :<BS><BS><BS>ma'>\a<
vmap <silent> \a, :<BS><BS><BS>ma'>\a,
vmap <silent> \a? :<BS><BS><BS>ma'>\a?
vmap <silent> \Tsp :<BS><BS><BS>ma'>\Tsp
vmap <silent> \T@ :<BS><BS><BS>ma'>\T@
vmap <silent> \T= :<BS><BS><BS>ma'>\T=
vmap <silent> \T< :<BS><BS><BS>ma'>\T<
vmap <silent> \T: :<BS><BS><BS>ma'>\T:
vmap <silent> \Ts, :<BS><BS><BS>ma'>\Ts,
vmap <silent> \T, :<BS><BS><BS>ma'>\T,
vmap <silent> \T| :<BS><BS><BS>ma'>\T|
map <silent> \tdW@ :AlignCtrl v ^\s*/[/*]:AlignCtrl mWp1P1=l @:'a,.Align
map <silent> \tW@ :AlignCtrl mWp1P1=l @:'a,.Align
nmap <silent> \t@ :AlignCtrl mIp1P1=l @:'a,.Align
omap <silent> \t@ :AlignCtrl mIp1P1=l @:'a,.Align
nmap <silent> \aocom :AlignPush:AlignCtrl g /[*/]\acom:AlignPop
omap <silent> \aocom :AlignPush:AlignCtrl g /[*/]\acom:AlignPop
vmap ]% ]%m'gv``
vmap a% [%v]%
nmap gx <Plug>NetrwBrowseX
noremap <Plug>CCMCCM :
nnoremap <silent> <Plug>NetrwBrowseX :call netrw#NetBrowseX(expand("<cWORD>"),0)
nnoremap <silent> <Plug>SVNCommitDiff :SVNCommitDiff
nnoremap <silent> <Plug>SVNVimDiff :SVNVimDiff
nnoremap <silent> <Plug>SVNUpdate :SVNUpdate
nnoremap <silent> <Plug>SVNUnedit :SVNUnedit
nnoremap <silent> <Plug>SVNInfo :SVNInfo
nnoremap <silent> <Plug>SVNStatus :SVNStatus
nnoremap <silent> <Plug>SVNReview :SVNReview
nnoremap <silent> <Plug>SVNRevert :SVNRevert
nnoremap <silent> <Plug>SVNLog :SVNLog
nnoremap <silent> <Plug>SVNClearAndGotoOriginal :SVNGotoOriginal!
nnoremap <silent> <Plug>SVNGotoOriginal :SVNGotoOriginal
nnoremap <silent> <Plug>SVNDiff :SVNDiff
nnoremap <silent> <Plug>SVNCommit :SVNCommit
nnoremap <silent> <Plug>SVNAnnotate :SVNAnnotate
nnoremap <silent> <Plug>SVNAdd :SVNAdd
vmap <silent> <Plug>IMAP_JumpBack `<i=IMAP_Jumpfunc('b', 0)
vmap <silent> <Plug>IMAP_JumpForward i=IMAP_Jumpfunc('', 0)
vmap <silent> <Plug>IMAP_DeleteAndJumpBack "_<Del>i=IMAP_Jumpfunc('b', 0)
vmap <silent> <Plug>IMAP_DeleteAndJumpForward "_<Del>i=IMAP_Jumpfunc('', 0)
nmap <silent> <Plug>IMAP_JumpBack i=IMAP_Jumpfunc('b', 0)
nmap <silent> <Plug>IMAP_JumpForward i=IMAP_Jumpfunc('', 0)
nnoremap <silent> <Plug>CVSWatchRemove :CVSWatchRemove
nnoremap <silent> <Plug>CVSWatchOff :CVSWatchOff
nnoremap <silent> <Plug>CVSWatchOn :CVSWatchOn
nnoremap <silent> <Plug>CVSWatchAdd :CVSWatchAdd
nnoremap <silent> <Plug>CVSWatchers :CVSWatchers
nnoremap <silent> <Plug>CVSVimDiff :CVSVimDiff
nnoremap <silent> <Plug>CVSUpdate :CVSUpdate
nnoremap <silent> <Plug>CVSUnedit :CVSUnedit
nnoremap <silent> <Plug>CVSStatus :CVSStatus
nnoremap <silent> <Plug>CVSReview :CVSReview
nnoremap <silent> <Plug>CVSRevert :CVSRevert
nnoremap <silent> <Plug>CVSLog :CVSLog
nnoremap <silent> <Plug>CVSClearAndGotoOriginal :CVSGotoOriginal!
nnoremap <silent> <Plug>CVSGotoOriginal :CVSGotoOriginal
nnoremap <silent> <Plug>CVSEditors :CVSEditors
nnoremap <silent> <Plug>CVSEdit :CVSEdit
nnoremap <silent> <Plug>CVSDiff :CVSDiff
nnoremap <silent> <Plug>CVSCommit :CVSCommit
nnoremap <silent> <Plug>CVSAnnotate :CVSAnnotate
nnoremap <silent> <Plug>CVSAdd :CVSAdd
noremap <Plug>CCMCR 
noremap <Plug>CCMBS <BS>
noremap <Plug>CCMEsc 
noremap <Plug>CCMC-O 
noremap <Plug>CCMC-R 
noremap <Plug>CCMC-C 
noremap <Plug>CCMC-U 
nnoremap <Plug>CCM? ?
nnoremap <Plug>CCM/ /
nnoremap <Plug>CCM: :
nmap <silent> <Plug>RestoreWinPosn :call RestoreWinPosn()
nmap <silent> <Plug>SaveWinPosn :call SaveWinPosn()
nmap <SNR>39_WE <Plug>AlignMapsWrapperEnd
nmap <SNR>39_WS <Plug>AlignMapsWrapperStart
cnoremap 	 :call SearchComplete()/s
imap 	 
imap <NL> <Plug>IMAP_JumpForward
cnoremap <silent>  :call SearchCompleteStop()
imap  :call Toggle()
imap  =CtrlXPP()
cnoremap <silent>  :call SearchCompleteStop()
inoremap  =GetCloseTag()
imap \ihn :IHN
imap \is :IHS:A
imap \ih :IHS
let &cpo=s:cpo_save
unlet s:cpo_save
set paste
set autoindent
set background=dark
set backspace=2
set encoding=utf-8
set noequalalways
set expandtab
set fileencodings=ucs-bom,utf-8,default
set guifont=shine
set guioptions=
set helplang=en
set history=50
set hlsearch
set nomodeline
set mouse=a
set mousemodel=popup
set ruler
set shiftwidth=4
set smarttab
set suffixes=.bak,~,.o,.h,.info,.swp,.obj,.info,.aux,.log,.dvi,.bbl,.out,.o,.lo
set tabstop=2
set termencoding=utf-8
set toolbar=
set viminfo=!,'20,\"500
set window=75
set winminwidth=20
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd /var/www/projects/quran/app/views/quran
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +7 app.js.erb
badd +118 desktop.js.erb
badd +88 index.css.erb
badd +6 index.html.erb
badd +0 index.js.erb
badd +0 main.js.erb
badd +0 module.js.erb
badd +0 sample.js.erb
badd +0 startmenu.js.erb
badd +202 taskbar.js.erb
badd +0 windows.js.erb
args app.js.erb desktop.js.erb index.css.erb index.html.erb index.js.erb main.js.erb module.js.erb sample.js.erb startmenu.js.erb taskbar.js.erb windows.js.erb
edit index.css.erb
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
exe 'vert 1resize ' . ((&columns * 20 + 139) / 279)
exe 'vert 2resize ' . ((&columns * 87 + 139) / 279)
exe 'vert 3resize ' . ((&columns * 170 + 139) / 279)
argglobal
enew
file -MiniBufExplorer-
let s:cpo_save=&cpo
set cpo&vim
nnoremap <buffer> 	 :call search('\[[0-9]*:[^\]]*\]'):<BS>
nnoremap <buffer> j gj
nnoremap <buffer> k gk
nnoremap <buffer> p :wincmd p:<BS>
nnoremap <buffer> <S-Tab> :call search('\[[0-9]*:[^\]]*\]','b'):<BS>
nnoremap <buffer> <Up> gk
nnoremap <buffer> <Down> gj
let &cpo=s:cpo_save
unlet s:cpo_save
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal balloonexpr=
setlocal nobinary
setlocal bufhidden=delete
setlocal nobuflisted
setlocal buftype=nofile
setlocal nocindent
setlocal cinkeys=0{,0},0),:,0#,!^F,o,O,e
setlocal cinoptions=
setlocal cinwords=if,else,while,do,for,switch
setlocal comments=s1:/*,mb:*,ex:*/,://,b:#,:%,:XCOMM,n:>,fb:-
setlocal commentstring=/*%s*/
setlocal complete=.,w,b,u,t,i
setlocal completefunc=
setlocal nocopyindent
set cursorcolumn
setlocal cursorcolumn
set cursorline
setlocal cursorline
setlocal define=
setlocal dictionary=
setlocal nodiff
setlocal equalprg=
setlocal errorformat=
setlocal expandtab
if &filetype != ''
setlocal filetype=
endif
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=0
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldmarker={{{,}}}
setlocal foldmethod=manual
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=foldtext()
setlocal formatexpr=
setlocal formatoptions=tcq
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal grepprg=
setlocal iminsert=2
setlocal imsearch=2
setlocal include=
setlocal includeexpr=
setlocal indentexpr=
setlocal indentkeys=0{,0},:,0#,!^F,o,O,e
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=
set linebreak
setlocal linebreak
setlocal nolisp
setlocal nolist
setlocal makeprg=
setlocal matchpairs=(:),{:},[:]
setlocal nomodeline
setlocal nomodifiable
setlocal nrformats=octal,hex
set number
setlocal nonumber
set numberwidth=7
setlocal numberwidth=7
setlocal omnifunc=
setlocal path=
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norightleft
setlocal rightleftcmd=search
setlocal noscrollbind
setlocal shiftwidth=4
setlocal noshortname
setlocal nosmartindent
setlocal softtabstop=0
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\	\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal statusline=
setlocal suffixesadd=
setlocal noswapfile
setlocal synmaxcol=3000
if &syntax != ''
setlocal syntax=
endif
setlocal tabstop=2
setlocal tags=
setlocal textwidth=0
setlocal thesaurus=
setlocal nowinfixheight
setlocal nowinfixwidth
set nowrap
setlocal nowrap
setlocal wrapmargin=0
wincmd w
argglobal
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal balloonexpr=RubyBalloonexpr()
setlocal nobinary
setlocal bufhidden=
setlocal buflisted
setlocal buftype=
setlocal nocindent
setlocal cinkeys=0{,0},0),:,0#,!^F,o,O,e
setlocal cinoptions=
setlocal cinwords=if,else,while,do,for,switch
setlocal comments=:#
setlocal commentstring=<!--%s-->
setlocal complete=.,w,b,u,t,i
setlocal completefunc=
setlocal nocopyindent
set cursorcolumn
setlocal cursorcolumn
set cursorline
setlocal cursorline
setlocal define=
setlocal dictionary=
setlocal nodiff
setlocal equalprg=
setlocal errorformat=
setlocal expandtab
if &filetype != 'html'
setlocal filetype=html
endif
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=0
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldmarker={{{,}}}
setlocal foldmethod=manual
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=foldtext()
setlocal formatexpr=
setlocal formatoptions=croql
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal grepprg=
setlocal iminsert=0
setlocal imsearch=0
setlocal include=^\\s*\\<\\(load\\|w*require\\)\\>
setlocal includeexpr=substitute(substitute(v:fname,'::','/','g'),'$','.rb','')
setlocal indentexpr=HtmlIndentGet(v:lnum)
setlocal indentkeys=o,O,*<Return>,<>>,{,}
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=ri\ -T
set linebreak
setlocal linebreak
setlocal nolisp
setlocal nolist
setlocal makeprg=
setlocal matchpairs=(:),{:},[:]
setlocal nomodeline
setlocal modifiable
setlocal nrformats=octal,hex
set number
setlocal number
set numberwidth=7
setlocal numberwidth=7
setlocal omnifunc=htmlcomplete#CompleteTags
setlocal path=.,/usr/lib/ruby/site_ruby/1.8,/usr/lib/ruby/site_ruby/1.8/i686-linux,/usr/lib/ruby/site_ruby,/usr/lib/ruby/1.8,/usr/lib/ruby/1.8/i686-linux,,/usr/lib/ruby/gems/1.8/gems/MultiRails-0.0.1/lib,/usr/lib/ruby/gems/1.8/gems/ParseTree-2.1.1/lib,/usr/lib/ruby/gems/1.8/gems/ParseTree-2.1.1/test,/usr/lib/ruby/gems/1.8/gems/ParseTree-2.2.0/lib,/usr/lib/ruby/gems/1.8/gems/ParseTree-2.2.0/test,/usr/lib/ruby/gems/1.8/gems/RailsEditor-0.0.29/lib,/usr/lib/ruby/gems/1.8/gems/RailsRemoteControl-1.0.0/lib,/usr/lib/ruby/gems/1.8/gems/RedCloth-3.0.4/lib,/usr/lib/ruby/gems/1.8/gems/RedCloth-4.0.1/lib,/usr/lib/ruby/gems/1.8/gems/RedCloth-4.0.1/lib/case_sensitive_require,/usr/lib/ruby/gems/1.8/gems/RingyDingy-1.2.1/lib,/usr/lib/ruby/gems/1.8/gems/RubyInline-3.6.6/lib,/usr/lib/ruby/gems/1.8/gems/RubyInline-3.7.0/lib,/usr/lib/ruby/gems/1.8/gems/SyslogLogger-1.4.0/lib,/usr/lib/ruby/gems/1.8/gems/ZenTest-3.10.0/lib,/usr/lib/ruby/gems/1.8/gems/ZenTest-3.9.1/lib,/usr/lib/ruby/gems/1.8/gems/abstract-1.0.0/lib,/usr/lib/ruby/gems/1.8/gems/a
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norightleft
setlocal rightleftcmd=search
setlocal noscrollbind
setlocal shiftwidth=4
setlocal noshortname
setlocal nosmartindent
setlocal softtabstop=0
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\	\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal statusline=
setlocal suffixesadd=.rb
setlocal swapfile
setlocal synmaxcol=3000
if &syntax != 'html'
setlocal syntax=html
endif
setlocal tabstop=2
setlocal tags=
setlocal textwidth=0
setlocal thesaurus=
setlocal nowinfixheight
setlocal nowinfixwidth
set nowrap
setlocal nowrap
setlocal wrapmargin=0
silent! normal! zE
let s:l = 86 - ((14 * winheight(0) + 37) / 74)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
86
normal! 015l
wincmd w
argglobal
edit index.html.erb
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal balloonexpr=RubyBalloonexpr()
setlocal nobinary
setlocal bufhidden=
setlocal buflisted
setlocal buftype=
setlocal nocindent
setlocal cinkeys=0{,0},0),:,0#,!^F,o,O,e
setlocal cinoptions=
setlocal cinwords=if,else,while,do,for,switch
setlocal comments=:#
setlocal commentstring=<!--%s-->
setlocal complete=.,w,b,u,t,i
setlocal completefunc=
setlocal nocopyindent
set cursorcolumn
setlocal cursorcolumn
set cursorline
setlocal cursorline
setlocal define=
setlocal dictionary=
setlocal nodiff
setlocal equalprg=
setlocal errorformat=
setlocal expandtab
if &filetype != 'html'
setlocal filetype=html
endif
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=0
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldmarker={{{,}}}
setlocal foldmethod=manual
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=foldtext()
setlocal formatexpr=
setlocal formatoptions=croql
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal grepprg=
setlocal iminsert=0
setlocal imsearch=2
setlocal include=^\\s*\\<\\(load\\|w*require\\)\\>
setlocal includeexpr=substitute(substitute(v:fname,'::','/','g'),'$','.rb','')
setlocal indentexpr=HtmlIndentGet(v:lnum)
setlocal indentkeys=o,O,*<Return>,<>>,{,}
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=ri\ -T
set linebreak
setlocal linebreak
setlocal nolisp
setlocal nolist
setlocal makeprg=
setlocal matchpairs=(:),{:},[:]
setlocal nomodeline
setlocal modifiable
setlocal nrformats=octal,hex
set number
setlocal number
set numberwidth=7
setlocal numberwidth=7
setlocal omnifunc=htmlcomplete#CompleteTags
setlocal path=.,/usr/lib/ruby/site_ruby/1.8,/usr/lib/ruby/site_ruby/1.8/i686-linux,/usr/lib/ruby/site_ruby,/usr/lib/ruby/1.8,/usr/lib/ruby/1.8/i686-linux,,/usr/lib/ruby/gems/1.8/gems/MultiRails-0.0.1/lib,/usr/lib/ruby/gems/1.8/gems/ParseTree-2.1.1/lib,/usr/lib/ruby/gems/1.8/gems/ParseTree-2.1.1/test,/usr/lib/ruby/gems/1.8/gems/ParseTree-2.2.0/lib,/usr/lib/ruby/gems/1.8/gems/ParseTree-2.2.0/test,/usr/lib/ruby/gems/1.8/gems/RailsEditor-0.0.29/lib,/usr/lib/ruby/gems/1.8/gems/RailsRemoteControl-1.0.0/lib,/usr/lib/ruby/gems/1.8/gems/RedCloth-3.0.4/lib,/usr/lib/ruby/gems/1.8/gems/RedCloth-4.0.1/lib,/usr/lib/ruby/gems/1.8/gems/RedCloth-4.0.1/lib/case_sensitive_require,/usr/lib/ruby/gems/1.8/gems/RingyDingy-1.2.1/lib,/usr/lib/ruby/gems/1.8/gems/RubyInline-3.6.6/lib,/usr/lib/ruby/gems/1.8/gems/RubyInline-3.7.0/lib,/usr/lib/ruby/gems/1.8/gems/SyslogLogger-1.4.0/lib,/usr/lib/ruby/gems/1.8/gems/ZenTest-3.10.0/lib,/usr/lib/ruby/gems/1.8/gems/ZenTest-3.9.1/lib,/usr/lib/ruby/gems/1.8/gems/abstract-1.0.0/lib,/usr/lib/ruby/gems/1.8/gems/a
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norightleft
setlocal rightleftcmd=search
setlocal noscrollbind
setlocal shiftwidth=4
setlocal noshortname
setlocal nosmartindent
setlocal softtabstop=0
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\	\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal statusline=
setlocal suffixesadd=.rb
setlocal swapfile
setlocal synmaxcol=3000
if &syntax != 'html'
setlocal syntax=html
endif
setlocal tabstop=2
setlocal tags=
setlocal textwidth=0
setlocal thesaurus=
setlocal nowinfixheight
setlocal nowinfixwidth
set nowrap
setlocal nowrap
setlocal wrapmargin=0
silent! normal! zE
let s:l = 7 - ((6 * winheight(0) + 37) / 74)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
7
normal! 045l
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 20 + 139) / 279)
exe 'vert 2resize ' . ((&columns * 87 + 139) / 279)
exe 'vert 3resize ' . ((&columns * 170 + 139) / 279)
tabnext 1
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToO
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . s:sx
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
