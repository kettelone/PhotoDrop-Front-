// import React from 'react'
// import Uppy from '@uppy/core'
// import Dashboard from '@uppy/dashboard'
// import AwsS3 from '@uppy/aws-s3'
// import photoService from '../../service/photoService'
// import '@uppy/core/dist/style.min.css'
// import '@uppy/dashboard/dist/style.min.css'

// const uppy = new Uppy({
// 	id: 'uploader-aws',
// 	restrictions: {
// 		maxFileSize: 31457280,
// 		maxNumberOfFiles: 20,
// 		minNumberOfFiles: null,
// 		allowedFileTypes: [ 'image/*' ]
// 	}
// })
// 	.use(Dashboard, {
// 		inline: false,
// 		target: 'body',
// 		trigger: '.select-file-button',
// 		proudlyDisplayPoweredByUppy: false,
// 		closeModalOnClickOutside: true
// 	})
// 	.use(AwsS3, {
// 		//@ts-ignore
// 		async getUploadParameters(files) {
// 			try {
// 				//@ts-ignore
// 				const response = await photoService.uploadPhotos(idScope, [
// 					//@ts-ignore
// 					files.data.name
// 				])
// 				const { url, fields } = response
// 				return {
// 					method: 'POST',
// 					url: url,
// 					fields: fields
// 				}
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	})

// export default uppy
