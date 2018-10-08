{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 1,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 767.0, 422.0, 299.0, 654.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 72.5, 508.8455810546875, 90.0, 22.0 ],
					"text" : "pattern 7",
					"varname" : "patterns[7]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 72.5, 470.275115966796875, 90.0, 22.0 ],
					"text" : "pattern 6",
					"varname" : "patterns[6]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 72.5, 431.70465087890625, 90.0, 22.0 ],
					"text" : "pattern 5",
					"varname" : "patterns[5]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 72.5, 393.134185791015625, 90.0, 22.0 ],
					"text" : "pattern 4",
					"varname" : "patterns[4]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 71.5, 354.563720703125, 90.0, 22.0 ],
					"text" : "pattern 3",
					"varname" : "patterns[3]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 71.5, 315.993255615234375, 90.0, 22.0 ],
					"text" : "pattern 2",
					"varname" : "patterns[2]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 71.5, 277.42279052734375, 90.0, 22.0 ],
					"text" : "pattern 1",
					"varname" : "patterns[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 71.5, 238.852325439453125, 90.0, 22.0 ],
					"text" : "pattern 0",
					"varname" : "patterns[0]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 71.5, 200.2818603515625, 90.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "mute[16]",
							"parameter_mmax" : 1.0,
							"parameter_shortname" : "mute",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr mute",
					"varname" : "mute"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 71.5, 161.711395263671875, 90.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "multiplier",
							"parameter_shortname" : "multiplier",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr multiplier",
					"varname" : "multiplier"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 71.5, 123.14093017578125, 90.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "gate",
							"parameter_shortname" : "gate",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr gate",
					"varname" : "gate"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 71.5, 84.570465087890625, 90.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "velocity",
							"parameter_shortname" : "velocity",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr velocity",
					"varname" : "velocity"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 71.5, 46.0, 90.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "pitch",
							"parameter_shortname" : "pitch",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr pitch",
					"varname" : "pitch"
				}

			}
 ],
		"lines" : [  ],
		"parameters" : 		{
			"obj-1::obj-22" : [ "start", "start", 0 ],
			"obj-12::obj-22" : [ "start[7]", "start", 0 ],
			"obj-2::obj-33" : [ "mute[1]", "mute", 0 ],
			"obj-1::obj-2" : [ "steps", "steps", 0 ],
			"obj-10::obj-2" : [ "steps[5]", "steps", 0 ],
			"obj-4::obj-2" : [ "steps[3]", "steps", 0 ],
			"obj-12::obj-2" : [ "steps[7]", "steps", 0 ],
			"obj-4::obj-33" : [ "mute[3]", "mute", 0 ],
			"obj-3::obj-2" : [ "steps[2]", "steps", 0 ],
			"obj-2::obj-22" : [ "start[1]", "start", 0 ],
			"obj-7" : [ "gate", "gate", 0 ],
			"obj-10::obj-22" : [ "start[5]", "start", 0 ],
			"obj-2::obj-24" : [ "end[1]", "end", 0 ],
			"obj-12::obj-24" : [ "end[11]", "end", 0 ],
			"obj-11::obj-33" : [ "mute[18]", "mute", 0 ],
			"obj-12::obj-33" : [ "mute[4]", "mute", 0 ],
			"obj-10::obj-24" : [ "end[9]", "end", 0 ],
			"obj-5" : [ "pitch", "pitch", 0 ],
			"obj-9::obj-22" : [ "start[4]", "start", 0 ],
			"obj-4::obj-24" : [ "end[3]", "end", 0 ],
			"obj-11::obj-24" : [ "end[10]", "end", 0 ],
			"obj-3::obj-33" : [ "mute[2]", "mute", 0 ],
			"obj-9::obj-33" : [ "mute[7]", "mute", 0 ],
			"obj-6" : [ "velocity", "velocity", 0 ],
			"obj-8" : [ "multiplier", "multiplier", 0 ],
			"obj-4::obj-22" : [ "start[3]", "start", 0 ],
			"obj-2::obj-2" : [ "steps[1]", "steps", 0 ],
			"obj-1::obj-33" : [ "mute", "mute", 0 ],
			"obj-1::obj-24" : [ "end", "end", 0 ],
			"obj-11::obj-2" : [ "steps[6]", "steps", 0 ],
			"obj-11::obj-22" : [ "start[6]", "start", 0 ],
			"obj-33" : [ "mute[16]", "mute", 0 ],
			"obj-10::obj-33" : [ "mute[17]", "mute", 0 ],
			"obj-9::obj-2" : [ "steps[4]", "steps", 0 ],
			"obj-3::obj-22" : [ "start[2]", "start", 0 ],
			"obj-9::obj-24" : [ "end[8]", "end", 0 ],
			"obj-3::obj-24" : [ "end[2]", "end", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "pattern.maxpat",
				"bootpath" : "D:/workspace/Max/Max-for-Live/m4l-launchpad-sequencer/launchpad-sequencer/launchpad-sequencer-device-project",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
