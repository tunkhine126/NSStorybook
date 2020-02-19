/**
 *
 * Photo Field Type
 *
 */

import React, { useCallback } from 'react';
import { asField } from 'informed';
import clsx from 'clsx';
import { injectIntl, intlShape } from 'react-intl';
import { useDropzone } from 'react-dropzone';

import Typography from '@material-ui/core/Typography';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { generateImg } from 'utils/helpers';
import { inputStyles } from 'global-styles';
import globalMessage from 'messages';
import { styles } from './styles';

const Photo = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { label, intl, ...rest } = props;
  const classes = styles();
  const globalClasses = inputStyles(fieldState.error)();

  const getBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => cb(reader.result);
    reader.onerror = error => {
      console.log('Error converting file to base64!: ', error);
    };
  };

  const onDrop = useCallback(
    acceptedFile => {
      getBase64(acceptedFile[0], result => {
        setValue(generateImg(result));
        setTouched(true);
      });
    },
    [setTouched, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/tiff, image/ief, image/gif',
  });

  // These two props are not native and are not needed
  delete rest.forwardedRef;
  delete rest.debug;

  return (
    <>
      <div {...getRootProps({ className: clsx(classes.dropzone, 'dropzone') })}>
        <input {...getInputProps()} />
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          {value ? (
            <Grid
              item
              className={classes.imgContainer}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <img
                src={value}
                alt={label}
                className={clsx(classes.img, 'uploaded-image')}
              />

              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                className={clsx(classes.overlay, 'img-overlay')}
              >
                <Typography gutterBottom className={classes.deleteText}>
                  {intl.formatMessage(globalMessage.removeImg)}
                </Typography>
                <IconButton
                  className={classes.deleteBtn}
                  aria-label="delete photo"
                  onClick={() => {
                    setValue('');
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ) : (
            <>
              <PhotoCameraIcon className={classes.icon} />
              <Typography
                gutterBottom
                variant="body1"
                className={classes.caption}
              >
                {isDragActive
                  ? intl.formatMessage(globalMessage.dropFile)
                  : label}
              </Typography>
            </>
          )}
        </Grid>
      </div>
      {fieldState.error ? (
        <small className={clsx(globalClasses.error, globalClasses.marginTop)}>
          {fieldState.error}
        </small>
      ) : null}
    </>
  );
});

Photo.propTypes = {
  intl: intlShape.isRequired,
};

const intlPhoto = injectIntl(Photo);

export default intlPhoto;
