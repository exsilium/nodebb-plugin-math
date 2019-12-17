<div class="row">
	<div class="col-lg-9">
		<form class="form math-settings">
			<div class="panel panel-default">
				<div class="panel-heading">Math</div>
				<div class="panel-body">
					<form role="form" class="math-settings">
						<div class="form-group">
							<label for="previewRender">
								<input type="checkbox" name="previewRender" id="previewRender" />
								Enable math rendering in composer preview
							</label>
							<p></p><label for="clientDebug">
								<input type="checkbox" name="clientDebug" id="clientDebug" />
								Enable client side debug (for plugin development purposes only!)
							</label></p>
							<div class="alert alert-info">
								<strong><i class="icon-info-sign"></i>To make it work!</strong>
								<p>
									Math depends on Markdown plugin to have <code>Automatically detect and highlight code blocks</code> feature turned on. Make sure it is!
								</p>
							</div>
              <div class="alert alert-info">
							  <strong><i class="icon-info-sign"></i>Restart on configuration change!</strong>
								<p>
									Restart your NodeBB instance for the new settings to come into effect.
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
	</div>
	<div class="col-lg-3">
		<div class="panel panel-default">
			<div class="panel-heading">Math Control Panel</div>
			<div class="panel-body">
				<button class="btn btn-primary" id="save">Save Settings</button>
			</div>
		</div>
	</div>
</div>